import * as cypress from "cypress";

describe('Reward Points Calculator', () => {
  it('Visits the Calculator Page', () => {
    cy.visit('/');
    cy.contains('Credit Card Rewards Point System');
    cy.url().should('include', '/calculator');

    let transactions = [
      {date: "2021-05-01", merchant_code: "sportcheck", amount_cents: 21000},
      {date: "2021-05-02", merchant_code: "sportcheck", amount_cents: 8700},
      {date: "2021-05-03", merchant_code: "tim_hortons", amount_cents: 323},
      {date: "2021-05-04", merchant_code: "tim_hortons", amount_cents: 1267},
      {date: "2021-05-05", merchant_code: "tim_hortons", amount_cents: 2116},
      {date: "2021-05-06", merchant_code: "tim_hortons", amount_cents: 2211},
      {date: "2021-05-07", merchant_code: "subway", amount_cents: 1853},
      {date: "2021-05-08", merchant_code: "subway", amount_cents: 2153},
      {date: "2021-05-09", merchant_code: "sportcheck", amount_cents: 7326},
      {date: "2021-05-10", merchant_code: "tim_hortons", amount_cents: 1321}
    ];

    transactions.forEach(t => {
      cy.get("#transaction_date").type(t.date);
      cy.get("#merchant_code").type(t.merchant_code);
      cy.get("#amount_cents").type(String(t.amount_cents));
      cy.get("#addBtn").click();
    });

    // selecting rules list as Main
    // cy.get("#ruleName").type("main");

    // cy.pause();

    // calculating reward points
    cy.get("#calculateRewardPointsBtn").click();

    cy.wait(3000);
    cy.scrollTo('bottom');
  });
});
