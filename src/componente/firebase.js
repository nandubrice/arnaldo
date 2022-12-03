// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCX9ZWiESNHxBTEXJdi4mEEVtcJAjJf22U',
    authDomain: 'fb-bdreact1-e42f5.firebaseapp.com',
    projectId: 'fb-bdreact1-e42f5',
    storageBucket: "fb-bdreact1-e42f5.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const bd = getFirestore();
export default app;
