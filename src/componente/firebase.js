// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAwP65v7Q_-0v5NKU2u6UXXnrBDCjVXc50',
    authDomain: 'fb-bdreact01-200b6.firebaseapp.com',
    projectId: 'fb-bdreact01-200b6',
    storageBucket: "fb-bdreact01-200b6.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const bd = getFirestore();
export default app;
