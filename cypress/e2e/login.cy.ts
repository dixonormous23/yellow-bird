describe('login form spec', () => {
    it('renders login form, then register form once create account button is clicked', () => {
        cy.visit('http://localhost:3000')
        cy.get('[data-cy=login-title]').should('be.visible');
        cy.wait(1000);
        cy.get('[data-cy=register-button]').click();
        cy.get('[data-cy=create-account]').should('be.visible');
    });

    it('populates login form with invalid credentials and expects <SubmissionError /> to render', () => {
        cy.visit('http://localhost:3000');
        // Sign in button should be disabled when no inputs are populated
        cy.get('[data-cy=login-button]').should('be.disabled');
        cy.get('[data-cy=login-email-input]').type('johnSnow@gmail.com');
        cy.get('[data-cy=login-password-input]').type('winterIsComing');
        cy.get('[data-cy=login-button]').click();
        cy.get('[data-cy=submission-error]').should('be.visible');
    });

    it('logins in with test user and navigates to /chat', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=login-email-input]').type('test@email.com');
        cy.get('[data-cy=login-password-input]').type('123123');
        cy.get('[data-cy=login-button]').click();
        cy.url().should('include', '/chat');
        cy.get('[data-cy=empty-chat]').should('be.visible');
    });
})