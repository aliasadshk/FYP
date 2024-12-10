import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyBoJaPr0EQLHh07hurrgX27NcrSjOY2FPQ',
    authDomain: 'gsapp-74111.firebaseapp.com',
    databaseURL:
      'https://gsapp-74111-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'gsapp-74111',
    storageBucket: 'gsapp-74111.appspot.com',
    messagingSenderId: '272597021323',
    appId: '1:272597021323:web:18ae60e757de9014a01a8e',
    measurementId: 'G-DR5D7ML78T',
};
const Firebaseapp = initializeApp(firebaseConfig);
export const auth=getAuth();
export default  Firebaseapp;