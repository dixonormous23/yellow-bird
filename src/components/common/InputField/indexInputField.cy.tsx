import { InputField } from '.';

describe('<InputField />', () => {
    it('renders <InputField />', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<InputField placeholder="Enter text..." onChange={() => {}} data-cy='input-field' />);
        cy.get('[data-cy=input-field]').should('have.attr', 'placeholder', 'Enter text...');
    });

    it('renders <InputField /> with provided prop value, expects value to be correctly set', () => {
        cy.mount(<InputField placeholder="Enter text..." onChange={() => {}} data-cy='input-field' value="Burritos" />);
        cy.get('[data-cy=input-field]').should('have.value', 'Burritos');
    });

    it('renders <InputField /> with label prop, expects label element to be mounted', () => {
        cy.mount(<InputField placeholder="Enter text..." onChange={() => { }} data-cy='input-field' label="Tacos" />);
        cy.get('[data-cy=input-label]').should('have.text', 'Tacos');
    });
})