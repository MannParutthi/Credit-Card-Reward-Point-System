const { convertCentsToDollars, rulesComparator } = require("./utils");

describe('Utils', () => {

    it('convertCentsToDollars', () => {
        expect(convertCentsToDollars(900)).toBe(9);
    });

    it('rulesComparator for same points', () => {
        const ruleA = {
            ruleId: 5,
            points: 75,
            conditions: [
                { purchaseAmount: 25, merchantCode: "sportcheck" },
                { purchaseAmount: 10, merchantCode: "tim_hortons" }
            ]
        };

        const ruleB = {
            ruleId: 6,
            points: 75,
            conditions: [
                { purchaseAmount: 20, merchantCode: "sportcheck" }
            ]
        };

        expect(rulesComparator(ruleB, ruleA)).toBeLessThan(0);
    });

    it('rulesComparator for diff points', () => {
        const ruleA = {
            ruleId: 5,
            points: 75,
            conditions: [
                { purchaseAmount: 25, merchantCode: "sportcheck" },
                { purchaseAmount: 10, merchantCode: "tim_hortons" }
            ]
        };

        const ruleB = {
            ruleId: 3,
            points: 200,
            conditions: [
                { purchaseAmount: 75, merchantCode: "sportcheck" },
            ]
        };

        expect(rulesComparator(ruleA, ruleB)).toBeGreaterThan(0);
    });

});