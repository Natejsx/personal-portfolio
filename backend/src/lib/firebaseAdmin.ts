import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  // K_SERVICE is set automatically in Firebase Cloud Functions
  if (process.env.K_SERVICE) {
    initializeApp();
  } else {
    const serviceAccount = require("../../../cred/serviceAccountKey.json");
    initializeApp({ credential: cert(serviceAccount) });
  }
}

export const db = getFirestore();
export const storage = getStorage();
