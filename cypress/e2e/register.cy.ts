import { CYPRESS_COOKIE } from "../../src/constants"

describe('register form spec', () => {
  it('navigates to register form, populates required fields and navigates to /chat', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=login-title]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-cy=register-button]').click();
    cy.get('[data-cy=create-account]').should('be.visible');

    cy.get('[data-cy=register-username]').type('theGhoul');
    cy.get('[data-cy=register-email]').type('fallout@gmail.com');
    cy.get('[data-cy=register-password]').type('123123');
    cy.get('[data-cy=register-password-confirm]').type('123123');
    cy.get('[data-cy=submit-register-button]').click();

    cy.url().should('include', '/chat');

    cy.wait(5000);

    // New users should automatically be invited to and join #welcome
    cy.get('[data-cy=channel-welcome]').should('be.visible');
    cy.getCookie(CYPRESS_COOKIE).then((cookie) => {
      if (!cookie?.value) return;

      //remove test user
      cy.request('POST', 'http://localhost:3000/api/cypress/remove-user', { userId: cookie.value })
      .its('status').should('equal', 200);
    })
  });

  it('populates partial required fields, expect register button to be disabled', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=login-title]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-cy=register-button]').click();
    cy.get('[data-cy=create-account]').should('be.visible');

    cy.get('[data-cy=register-username]').type('theGhoul');
    cy.get('[data-cy=register-email]').type('fallout@gmail.com');
    cy.get('[data-cy=register-password]').type('123123');
    cy.get('[data-cy=submit-register-button]').should('be.disabled');
  });

  it('populates all required fields with mismatching passwords, expect submit button to be disabled', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=login-title]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-cy=register-button]').click();
    cy.get('[data-cy=create-account]').should('be.visible');

    cy.get('[data-cy=register-username]').type('theGhoul');
    cy.get('[data-cy=register-email]').type('fallout@gmail.com');
    cy.get('[data-cy=register-password]').type('123123');
    cy.get('[data-cy=register-password-confirm]').type('oopsies');
    cy.get('[data-cy=submit-register-button]').should('be.disabled');
  });

})