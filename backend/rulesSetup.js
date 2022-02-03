const rules = require('./database/models/rules');

const initialRulesSetup = () => {
    rules.insertMany([
        {
            rulesListName: "main",
            rulesListId: "1001",
            rulesList: [
                {
                    ruleId: 1,
                    points: 500,
                    conditions: [
                        { purchaseAmount: 75, merchantCode: "sportcheck" },
                        { purchaseAmount: 25, merchantCode: "tim_hortons" },
                        { purchaseAmount: 25, merchantCode: "subway" }
                    ]
                },
                {
                    ruleId: 2,
                    points: 300,
                    conditions: [
                        { purchaseAmount: 75, merchantCode: "sportcheck" },
                        { purchaseAmount: 25, merchantCode: "tim_hortons" }
                    ]
                },
                {
                    ruleId: 3,
                    points: 200,
                    conditions: [
                        { purchaseAmount: 75, merchantCode: "sportcheck" },
                    ]
                },
                {
                    ruleId: 4,
                    points: 150,
                    conditions: [
                        { purchaseAmount: 25, merchantCode: "sportcheck" },
                        { purchaseAmount: 10, merchantCode: "tim_hortons" },
                        { purchaseAmount: 10, merchantCode: "subway" }
                    ]
                },
                {
                    ruleId: 5,
                    points: 75,
                    conditions: [
                        { purchaseAmount: 25, merchantCode: "sportcheck" },
                        { purchaseAmount: 10, merchantCode: "tim_hortons" }
                    ]
                },
                {
                    ruleId: 6,
                    points: 75,
                    conditions: [
                        { purchaseAmount: 20, merchantCode: "sportcheck" }
                    ]
                },
                {
                    ruleId: 7,
                    points: 1,
                    conditions: [
                        { purchaseAmount: 1, merchantCode: "others" },
                    ]
                },
            ]
        },
        {
            rulesListName: "example1",
            rulesListId: "1002",
            rulesList: [
                {
                    ruleId: 1,
                    points: 10,
                    conditions: [
                        { purchaseAmount: 1, merchantCode: "sportcheck" },
                    ]
                },
            ]
        },
        {
            rulesListName: "example2",
            rulesListId: "1003",
            rulesList: [
                {
                    ruleId: 1,
                    points: 10,
                    conditions: [
                        { purchaseAmount: 1, merchantCode: "sportcheck" },
                    ]
                },
                {
                    ruleId: 2,
                    points: 100,
                    conditions: [
                        { purchaseAmount: 5, merchantCode: "sportcheck" },
                    ]
                },
            ]
        },
        {
            rulesListName: "example3",
            rulesListId: "1004",
            rulesList: [
                {
                    ruleId: 1,
                    points: 100,
                    conditions: [
                        { purchaseAmount: 5, merchantCode: "sportcheck" },
                    ]
                },
                {
                    ruleId: 2,
                    points: 10,
                    conditions: [
                        { purchaseAmount: 1, merchantCode: "others" },
                    ]
                },
            ]
        }
    ]);
}

module.exports = initialRulesSetup;