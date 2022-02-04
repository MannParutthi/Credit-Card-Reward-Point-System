exports.convertCentsToDollars = (amountInCents) => {
    return amountInCents / 100;
}

exports.rulesComparator = (a, b) => {
    if (b.points == a.points) {
        let aCondTotalAmt = 0
        a.conditions.forEach(cnd => { aCondTotalAmt += cnd.purchaseAmount });
        let bCondTotalAmt = 0
        b.conditions.forEach(cnd => { bCondTotalAmt += cnd.purchaseAmount });
        return (b.points / bCondTotalAmt) - (a.points / aCondTotalAmt);
    }
    else {
        return b.points - a.points;
    }
}