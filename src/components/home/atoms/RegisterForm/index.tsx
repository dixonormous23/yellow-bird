import { useState, useMemo } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

import { formattedFirebaseError } from '@/utils/formattedFirebaseError';
import { DEFAULT_AVATAR } from '@/constants';
import { auth, db } from '@/firebase';
import { InputField, StyledForm, FormSubmitContainer, SubmissionError, Button } from '@/components/common';
import { AvatarModal } from './AvatarModal';
import { AvatarContainer, FormSubtitle, FormTitle, UploadAvatarButton, UserAvatar } from './styles';

interface RegisterFormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string | null;
};

interface RegisterFormProps {
    handleBackToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleBackToLogin }) => {
    const router = useRouter();
    const [uploadAvatarOpen, setUploadAvatarOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [state, setState] = useState<RegisterFormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;

        setState((prev) => ({
            ...prev,
            [name]: e.target.value
        }))
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setSubmitting(true);
    
        if (!state?.email || state?.password?.length < 6) return;

        try {
            const { user } = await createUserWithEmailAndPassword(auth, state.email, state.password)

            await db.set(`/users/${user.uid}`, { username: state.username, avatar: state.avatar ?? DEFAULT_AVATAR });
            router.replace('/chat');
        } catch (error) {
            setError(formattedFirebaseError(error));
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setUploadAvatarOpen(!uploadAvatarOpen);
    };

    const handleSelectedAvatar = (avatar: string | null) => {
        setState((prev) => ({
            ...prev,
            avatar
        }));
        handleCloseModal();
    };

    const submitDisabled = useMemo(() => !(
        state?.username &&
        state.email &&
        state.password?.length >= 6 &&
        state.confirmPassword === state.password &&
        !submitting
    ), [state, submitting]);

    return (
        <>
            <FormTitle>Create Account</FormTitle>
            <FormSubtitle>Already have an account? <span onClick={handleBackToLogin}>Back to Login</span></FormSubtitle>
            <AvatarContainer>
                <UserAvatar src={state?.avatar ?? DEFAULT_AVATAR} alt="user_avatar" />
                <UploadAvatarButton onClick={() => setUploadAvatarOpen(true)}>Upload Avatar</UploadAvatarButton>
            </AvatarContainer>
            <StyledForm onSubmit={onSubmit} autoComplete="off">
                <InputField
                    required
                    name="username"
                    label="Username"
                    placeholder="johnnyDoe23"
                    onChange={onChange}
                />
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
                    placeholder="Minimum 6 characters"
                    onChange={onChange}
                />
                <InputField
                    required
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    onChange={onChange}
                />
                <FormSubmitContainer>
                    <Button label="Submit" type="submit" disabled={submitDisabled} />
                </FormSubmitContainer>
                {error && <SubmissionError>{error}</SubmissionError>}
            </StyledForm>
            <AvatarModal
                open={uploadAvatarOpen}
                handleClose={handleCloseModal}
                handleSelectedAvatar={handleSelectedAvatar}
            />
        </>
    );
};
