import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// optional
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAKLO8BeKhGDytPnM0hwKj7d7oUHcVfvB8",
  authDomain:"syncwell-f1dea.firebaseapp.com",
  projectId: "syncwell-f1dea",
  storageBucket:"syncwell-f1dea.firebasestorage.app",
  messagingSenderId: "314736879742",
  appId:  "1:314736879742:web:343bf966798c20b664502f",
  measurementId: "G-54NHBNG2EW"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// optional analytics
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;