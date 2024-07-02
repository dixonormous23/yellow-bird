import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY,
            clientEmail: process.env.NEXT_PUBLIC_ADMIN_CLIENT_EMAIL,
            projectId: process.env.NEXT_PUBLIC_ADMIN_PROJECT_ID
        })
    });
}

export const firebaseAdmin = admin;