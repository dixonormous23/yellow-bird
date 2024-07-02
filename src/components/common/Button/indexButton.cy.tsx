import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '.';
import { ProviderProps } from '../../../../@types';

const ThemeWrapper: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

describe('<Button />', () => {
    it('renders <Button /> with correct button text', () => {
        cy.mount(
            <ThemeWrapper>
                <Button label="label" data-cy="theme-button" />
            </ThemeWrapper>
        );

        cy.get('[data-cy=theme-button]').should('have.text', 'label');
    });

    it('renders <Button /> and expects to be disabled', () => {
        cy.mount(
            <ThemeWrapper>
                <Button label="label" data-cy="theme-button" disabled />
            </ThemeWrapper>
        );

        cy.get('[data-cy=theme-button]').should('be.disabled');
    });
});