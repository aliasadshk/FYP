//import liraries
import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';
import Navigation from './Navigation/Navigation';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';
import commonStyle from './src/helper/commonStyle';
import auth from '@react-native-firebase/auth';

console.disableYellowBox = true;

// create a component
const App = () => {
  useEffect(() => {
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.initializeApp(firebaseConfig);
    }
  });
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [Phone, setPhone] = useState('');
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log("phoneNumber",phoneNumber)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const con = await confirm.confirm(code);
      console.log("concon",con)
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <StatusBar backgroundColor="#3885DA" barStyle="auto" />
      <Navigation />
      <Toast position="bottom" bottomOffset={20} visibilityTime={3000} />
    </SafeAreaView>
  );
  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+923415584181')}
  //     />
  //   );
  // }

  // return (
  //   <View>
  //     <TextInput value={code} onChangeText={text => setCode(text)} />
  //     <Button title="Confirm Code" onPress={() => confirmCode()} />
  //   </View>
  // );
  }
export default App;








// import React, {useEffect,useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Button,
//   TextInput
// } from 'react-native';
// import Toast from 'react-native-toast-message';
// import Navigation from './Navigation/Navigation';
// console.disableYellowBox = true;

// // create a component
// const App = () => {

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
//       <StatusBar backgroundColor="#fff" barStyle="auto" />
//       <Navigation/>
//       <Toast position="bottom" bottomOffset={20} visibilityTime={3000} />
//     </SafeAreaView>
//   );
//   }
// export default App;

