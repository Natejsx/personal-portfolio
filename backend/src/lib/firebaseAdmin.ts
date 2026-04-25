import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as fs from "fs";
import * as path from "path";

if (!getApps().length) {
  const keyPath = path.resolve(__dirname, "../../../cred/serviceAccountKey.json");
  if (fs.existsSync(keyPath)) {
    initializeApp({ credential: cert(require(keyPath)) });
  } else {
    initializeApp();
  }
}

export const db = getFirestore();
export const storage = getStorage();
