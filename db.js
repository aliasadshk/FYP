
import firebase from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';
var firebaseConfig = {
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
    
  const app = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(app)
const database = getFirestore(app);
export default db;
