describe('Search player feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Render header', () => {
    cy.contains('Faceit Pocket Stats').should('exist');
  });

  it('Find player by pasted steam profile url', () => {
    const urlToPaste = 'https://steamcommunity.com/profiles/76561198041683378';
    cy.getById('search-input').type(urlToPaste);
    cy.getById('submit-button').click();
    cy.wait(6000);
    cy.contains('Basic player statistics').should('exist');
    cy.contains('24h results').should('exist');
    cy.contains('History of user bans (imposed by the administrator).').should(
      'exist'
    );
  });

  it('Search player by faceit name', () => {
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

  it('Find another player from user view', async () => {
    const firstNickToSearch: string = 's1mple';

    cy.getById('search-input').type(firstNickToSearch);
    cy.getById(`autocomplete-item-${firstNickToSearch}`).click();
    cy.wait(6000);
    cy.contains(firstNickToSearch).should('exist');
    cy.contains('Basic player statistics').should('exist');
    cy.contains('24h results').should('exist');
    cy.contains('History of user bans (imposed by the administrator).').should(
      'exist'
    );

    const secondNickToSearch: string = 'niko';
    cy.getById('search-input').type(secondNickToSearch);
    cy.getById(`autocomplete-item-${secondNickToSearch}`).click();
    cy.wait(6000);
    cy.contains(secondNickToSearch).should('exist');
    cy.contains('Basic player statistics').should('exist');
    cy.contains('24h results').should('exist');
    cy.contains('History of user bans (imposed by the administrator).').should(
      'exist'
    );
  });
});
