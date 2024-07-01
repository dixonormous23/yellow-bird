import { useState } from 'react';
import { FormContainer, FormPageContainer } from '@/components/common'
import { LoginForm, RegisterForm } from './atoms';

enum ActiveStep {
    LOGIN = 'login',
    REGISTER = 'register'
}

export const HomePageComponent = () => {
    const [activeStep, setActiveStep] = useState<ActiveStep>(ActiveStep.LOGIN);

    return (
        <FormPageContainer>
            <FormContainer>
                {activeStep === ActiveStep.LOGIN ? (
                    <LoginForm handleCreateAccount={() => setActiveStep(ActiveStep.REGISTER)} />
                ) : (
                    <RegisterForm handleBackToLogin={() => setActiveStep(ActiveStep.LOGIN)} />
                )}
            </FormContainer>
        </FormPageContainer>
    );
};
