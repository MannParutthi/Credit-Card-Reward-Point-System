const mongoose = require('mongoose');

const conditionsSchema = new mongoose.Schema({
    merchantCode: { type: String, required: true },
    purchaseAmount: { type: Number, required: true }
});

const ruleSchema = new mongoose.Schema({
    ruleId: { type: Number, required: true },
    points: { type: Number, required: true },
    conditions: { type: [conditionsSchema], default: [], required: true }
});

const rewardRulesSchema = new mongoose.Schema({
    rulesListName: { type: String, required: true },
    rulesListId: { type: Number, required: true },
    rulesList: { type: [ruleSchema], default: [], required: true }
});


const rules = mongoose.model('Rules', rewardRulesSchema);

module.exports = rules;
