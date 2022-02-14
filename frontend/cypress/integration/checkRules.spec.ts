describe('Reward Points Calculator', () => {
  it('Visits the Rules Page', () => {
    cy.visit('/rules/main');
    cy.contains('Credit Card Rewards Point System');
    cy.contains('Rules List Name');
    cy.contains('main');
  });
});
