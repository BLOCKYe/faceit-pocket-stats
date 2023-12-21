describe('Display homepage elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Render header', () => {
    cy.contains('Faceit Pocket Stats').should('exist');
  });

  it('Render search input', () => {
    cy.getById('search-input').should('exist');
  });
});
