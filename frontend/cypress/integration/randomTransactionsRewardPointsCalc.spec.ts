import * as cypress from "cypress";

describe('Random Transactions - Reward Points Calculation', () => {
  it('Visits the Calculator Page', () => {
    cy.visit('/');
    cy.contains('Credit Card Rewards Point System');
    cy.url().should('include', '/calculator');

    const merchants = ["sportcheck", "tim_hortons", "subway", "the_bay"];

    const getRandomDate = () => {
      let start = new Date(2010, 10, 10);
      let end = new Date();

      let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }


    for (let i = 0; i < 100; i++) {
      let transactions = [];
      for(let j = 0; j < 10; j++) {
        let transaction = {
          date: getRandomDate(),
          merchant_code: merchants[Math.floor(Math.random() * merchants.length)],
          amount_cents: Math.floor(Math.random() * 10000)
        };
        transactions.push(transaction);
      }

      transactions.forEach(t => {
        cy.get("#transaction_date").type(t.date);
        cy.get("#merchant_code").type(t.merchant_code);
        cy.get("#amount_cents").type(String(t.amount_cents));
        cy.get("#addBtn").click();
      });

      cy.get("#calculateRewardPointsBtn").click();

      cy.wait(3000);
      cy.scrollTo('bottom');
      cy.reload();
    }

  });
});
