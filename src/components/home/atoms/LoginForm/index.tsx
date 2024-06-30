import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { auth, signInWithEmailAndPassword } from '@/firebase';
import { formattedFirebaseError } from '@/utils/formattedFirebaseError';
import { DividerText } from '@/components/common/DividerText';
import {
    InputField,
    StyledForm,
    FormSubmitContainer,
    SubmitButton,
    SubmissionError
} from '@/components/common';
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

interface LoginFormProps {
    handleCreateAccount: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleCreateAccount }) => {
    const router = useRouter();

    const [state, setState] = useState<FormState>({
        email: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
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
        setSubmitting(true);
        try {
            await signInWithEmailAndPassword(auth, state.email, state.password);
            router.push('/chat');
        } catch (error) {
            setError(formattedFirebaseError(error));
            setSubmitting(false);
        }
    };

    const submitDisabled = useMemo(() => !(state.email && state.password?.length >= 6 && !submitting), [state, submitting]);

    return (
        <>
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
            <DividerText text="or" gutters />
            <RegisterAccountWrapper>
                <GetStartedButton onClick={handleCreateAccount}>Create account</GetStartedButton>
            </RegisterAccountWrapper>
        </>
    )
}