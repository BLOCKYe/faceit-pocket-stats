describe('Search player feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    const nickToSearch = 's1mple';
    cy.getById('search-input').type(nickToSearch);
    cy.getById(`autocomplete-item-${nickToSearch}`).click();
    cy.wait(6000);
    cy.contains(nickToSearch).should('exist');
    cy.contains('Basic player statistics').should('exist');
    cy.contains('24h results').should('exist');
    cy.contains('History of user bans (imposed by the administrator).').should(
      'exist'
    );
  });

  it('Render page', () => {
    cy.contains('Last match:').should('exist');
  });

  it('Redirect to user steam profile', () => {
    cy.getById('steam-button').click();
  });

  it('Redirect to user faceit profile', () => {
    cy.getById('faceit-button').click();
  });

  it('Test matches list navigation', () => {
    cy.getById('previous-page-button').should('be.disabled');
    cy.getById('next-page-button').click();
    cy.wait(3000);
    cy.contains('Page 2').should('exist');
    cy.getById('previous-page-button').click();
    cy.wait(3000);
    cy.contains('Page 1').should('exist');
  });

  it('Display statistics from CSGO', () => {
    cy.contains('CSGO Statistics').click();
    cy.contains('Basic player statistics in CSGO.').should('exist');
  });
});
