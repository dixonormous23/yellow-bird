describe('channel spec', () => {
  it('navigates #cypress channel and submits new message, expects message to be sent', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=login-email-input]').type('test@email.com');
    cy.get('[data-cy=login-password-input]').type('123123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
    cy.wait(5000);
    cy.get('[data-cy=channel-cypress]').click();
    cy.wait(5000);
    cy.get('[data-cy=channel-messages]').children().then((value) => {
      cy.get('[data-cy=channel-input]').type('Hello world!')
      cy.get('[data-cy=channel-input-submit]').click();
      cy.get('[data-cy=channel-messages]').children().should('have.length.above', value.children.length)
    })
  });

  it('should create a new channel and successfully navigate to it', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=login-email-input]').type('test@email.com');
    cy.get('[data-cy=login-password-input]').type('123123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
    cy.wait(5000);
    cy.get('[data-cy=create-channel-button]').click();

    cy.get('[data-cy=new-channel-input]').type('canary123');
    cy.get('[data-cy=create-channel-modal-button]').click();
    cy.wait(3000);
    cy.get('[data-cy=channel-canary123]').click();
    cy.request('POST', 'http://localhost:3000/api/cypress/delete-channel');
  });

  it('should not allow a channel to be created if channel name already exists', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=login-email-input]').type('test@email.com');
    cy.get('[data-cy=login-password-input]').type('123123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
    cy.wait(5000);
    cy.get('[data-cy=create-channel-button]').click();

    cy.get('[data-cy=new-channel-input]').type('puffinsRock');
    cy.get('[data-cy=create-channel-modal-button]').click();
    cy.get('[data-cy=create-channel-error]').should('be.visible');
  })
})