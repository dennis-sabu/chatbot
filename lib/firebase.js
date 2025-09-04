"use client"; // ensure client-side for Firebase

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

let app;

// Only initialize app once
if (!getApps().length) {
  app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
} else {
  app = getApps()[0];
}

// Auth instance
export const auth = getAuth(app);

export default app;
