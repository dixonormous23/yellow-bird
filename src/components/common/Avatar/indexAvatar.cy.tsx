import { Avatar } from '.';

describe('<Avatar />', () => {
    it('renders <Avatar />, expects correct image to be set from src props', () => {
        cy.mount(<Avatar src="https://placekeanu.com/700/350" alt="Mr. Anderson" />);
        cy.get('[data-cy=avatar]').should('have.attr', 'src').should('include', 'https://placekeanu.com/700/350');
    });

    it('renders <Avatar /> with size prop, expects correct width and height styles set accordingly', () => {
        cy.mount(<Avatar src="https://placekeanu.com/700/350" alt="Mr. Anderson" size={100} />);
        cy.get('[data-cy=avatar]').invoke('height').should('equal', 100); 
        cy.get('[data-cy=avatar]').invoke('width').should('equal', 100); 
    });
})