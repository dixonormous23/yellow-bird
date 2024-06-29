import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
    getDatabase,
    ref,
    set as setter,
    get as getter
} from "firebase/database";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInAnonymously,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage();

// Create a class to interface with Firebase, mostly for personal preference and return value typing
class Database {
    async get<T>(path: string): Promise<T> {
        return await new Promise(async (resolve, reject) => {
            await getter(ref(database, path))
                .then((snap) => resolve(snap.val() as T))
                .catch((e) => reject(e))
        })
    };

    async set(path: string, values: any) {
        return await new Promise(async (resolve, reject) => {
            await setter(ref(database, path), values)
                .then(() => resolve(''))
                .catch((e) => reject(e))
        })
    };
}

export const db = new Database();

export {
    signOut,
    signInAnonymously,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
}