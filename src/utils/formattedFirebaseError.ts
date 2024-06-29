import { FirebaseError } from "firebase/app";

export const formattedFirebaseError = (error: unknown) => {
    const firebaseError = error as FirebaseError;
    switch (firebaseError.code) {
        case 'auth/email-already-in-use':
            return "Email already exists on another user's account.";
        case 'auth/invalid-credential':
            return "Password or email are incorrect, please try again."
        default:
            return "Something went wrong, please try again later.";
    };
}