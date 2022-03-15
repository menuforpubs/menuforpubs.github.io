// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlDB8tF5SjGH3ltlMhSnmejdpnPYM-Pak',
  authDomain: 'menu-for-pubs.firebaseapp.com',
  projectId: 'menu-for-pubs',
  storageBucket: 'menu-for-pubs.appspot.com',
  messagingSenderId: '704350190760',
  appId: '1:704350190760:web:3bccda612def8f46fd969d',
  measurementId: 'G-QSWTPRX45Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
console.log(analytics);

export const db = getFirestore(app);
