import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { FB_API_KEY, FB_APP_ID, FB_AUTH_DOMAIN, FB_DB_URL, FB_MEASUREMENT_ID, FB_MESSAGING_SENDER_ID, FB_PROJECT_ID, FB_STORAGE_BUCKET } from '@env';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)

export const isAuth = !!firebaseAuth?.currentUser?.uid