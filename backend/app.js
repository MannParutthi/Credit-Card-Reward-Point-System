const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const rules = require('./database/models/rules');
const initialRulesSetup = require('./rulesSetup');
const { convertCentsToDollars, rulesComparator } = require('./utils');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, HEAD, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

initialRulesSetup();

app.get('/getRules', (req, res) => {
    rules.findOne({rulesListName: req.query['selectedRules']})
        .then(rulesList => res.send(rulesList))
        .catch(err => console.log(err));
});

app.post('/calculateRewardPoints', (req, res) => {
    console.log("==================== calculateRewardPoints =========================")
    let rewardPoints = 0
    let totalTransactions = {sportcheck: 0, tim_hortons: 0, subway: 0, others: 0}
    rules.find({}).then(rulesList => {
        //finding total amount of transactions on all shops 
        req.body['transactionsList'].forEach(transaction => {             
            if(['sportcheck', 'tim_hortons', 'subway'].includes(transaction.merchant_code)) {
                totalTransactions[transaction.merchant_code] += convertCentsToDollars(transaction.amount_cents);
            }
            else {
                totalTransactions["others"] += convertCentsToDollars(transaction.amount_cents);
            }
        });
        console.log("totalTransactions => ", totalTransactions)

        // finding main rules list from the multiple rulesList and sorting it according to priority
        let mainRules = rulesList.find(rules => rules.rulesListName == req.body['selectedRules']);
        let priorityRulesList = (mainRules.rulesList).sort((a,b) => rulesComparator(a,b));
        console.log("priorityRulesList => ", priorityRulesList);

        let rulesApplied = {};
        priorityRulesList.forEach(rule => {
            let areAllConditionsMet = true
            while (areAllConditionsMet) {
                rule.conditions.forEach(condition => {
                    if(condition.merchantCode == "others") { // assuming others will be the last rule 
                        let leftOverAmountAndOtherPurchases = Object.values(totalTransactions).reduce((a,b) => a + b);
                        totalTransactions.sportcheck = 0;
                        totalTransactions.subway = 0;
                        totalTransactions.tim_hortons = 0;
                        totalTransactions.others = leftOverAmountAndOtherPurchases;
                    }
                    if(totalTransactions[condition.merchantCode] - condition.purchaseAmount < 0) {
                        areAllConditionsMet = false;
                    }
                });
                
                if(areAllConditionsMet) {
                    rule.conditions.forEach(condition => { 
                        if(["sportcheck", "tim_hortons", "subway"].includes(condition.merchantCode)){
                            totalTransactions[condition.merchantCode] -= condition.purchaseAmount;
                        }
                        else {
                            totalTransactions["others"] -= condition.purchaseAmount;
                        }
                    });
                    console.log("Matched Rule No => ", rule.ruleId, " & Rule Points => ", rule.points)
                    console.log("totalTransactions => ", totalTransactions)
                    rewardPoints += rule.points;
                    if(rule.ruleId in rulesApplied) {
                        rulesApplied[rule.ruleId] += 1;
                    }else {
                        rulesApplied[rule.ruleId] = 1;
                    }
                }
            }
        });

        console.log("rulesApplied => ", rulesApplied)
        res.send({rewardPoints: rewardPoints, rulesApplied: rulesApplied})
    });
});

app.listen(3000, () => console.log("Server is connected on Port 3000"));

module.exports = app;