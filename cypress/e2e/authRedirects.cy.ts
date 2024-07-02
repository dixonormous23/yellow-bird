describe('authRedirects spec', () => {
  it('navigates to /chat with no user credentials, expects redirect back to login form', () => {
    cy.visit('http://localhost:3000/chat')
    cy.url().should('not.include', '/chat')
  });

  it('logs in and attempts to redirect back to login page, expects redirect back to /chat', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=login-email-input]').type('test@email.com');
    cy.get('[data-cy=login-password-input]').type('123123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
    cy.wait(3000);
    cy.visit('http://localhost:3000')
    cy.url().should('include', '/chat');
  });

  it('logs in and clicks sign out button, expect to be redirected back to /', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=login-email-input]').type('test@email.com');
    cy.get('[data-cy=login-password-input]').type('123123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
    cy.wait(3000);
    cy.get('[data-cy=sign-out-button]').click();
    cy.url().should('not.include', '/chat');
  });
})