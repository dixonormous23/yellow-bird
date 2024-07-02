import admin from 'firebase-admin';
import keys from './keys.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: keys.private_key,
            clientEmail: keys.client_email,
            projectId: keys.project_id
        })
    });
}

export const firebaseAdmin = admin;