import { useMemo, useState } from 'react';
import {
    InputField,
    FormContainer,
    FormPageContainer,
    StyledForm,
    FormSubmitContainer,
    SubmitButton,
    SubmissionError
} from '../common';
import {
    HeroTitle,
    HeroSubTitle,
    GetStartedButton,
    LoginFormWrapper,
    RegisterAccountWrapper,
} from "./styles";

interface FormState {
    email: string;
    password: string;
};

export const HomePageComponent = () => {
    const [state, setState] = useState<FormState>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setState((prev) => ({
            ...prev,
            [name]: e.target.value
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    const submitDisabled = useMemo(() => !(state.email && state.password?.length >= 6), [state]);

    return (
        <FormPageContainer>
            <FormContainer>
                <LoginFormWrapper>
                    <HeroTitle>Welcome to Canary Chat!</HeroTitle>
                    <HeroSubTitle>Chat with virtually anyone in the world for free!</HeroSubTitle>
                    <StyledForm $gutter onSubmit={onSubmit}>
                        <InputField
                            required
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="johnny@doe.com"
                            onChange={onChange}
                        />
                        <InputField
                            required
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                        <FormSubmitContainer>
                            <SubmitButton type="submit" disabled={submitDisabled}>Sign in</SubmitButton>
                        </FormSubmitContainer>
                        {error && <SubmissionError>{error}</SubmissionError>}
                    </StyledForm>
                </LoginFormWrapper>
                <RegisterAccountWrapper>
                    <GetStartedButton href="/register">Create account</GetStartedButton>
                </RegisterAccountWrapper>
            </FormContainer>
        </FormPageContainer>
    );
};
