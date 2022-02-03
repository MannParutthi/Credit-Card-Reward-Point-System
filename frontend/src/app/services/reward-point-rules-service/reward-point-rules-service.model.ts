export interface RewardPointRulesModel {
  rulesListName: String,
  rulesListId: Number,
  rulesList: Array<{
    ruleId: Number,
    points: Number,
    conditions: Array<{ merchantCode: String, purchaseAmount: Number }>
  }>
}
