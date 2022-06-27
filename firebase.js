import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBIGCFxyn8IsBTeVi_LZfMHPtw0Sbj7fjw',
  authDomain: 'instagram-clone-94efe.firebaseapp.com',
  projectId: 'instagram-clone-94efe',
  storageBucket: 'instagram-clone-94efe.appspot.com',
  messagingSenderId: '264755666950',
  appId: '1:264755666950:web:a5be7d2e233c6dc574e387',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage, auth };
