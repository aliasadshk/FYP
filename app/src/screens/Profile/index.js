import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import styles from '../ContactUs/styles';
import Curvedheader from '../../Components/Curvedheader';
import commonStyle from '../../helper/commonStyle';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
function Profile() {
  const [name, setname] = useState('');
  const [Email, setEmail] = useState('');
  const [isFocus, setIsFocus] = useState(true);
  const [ShowDate, setShowDate] = useState('');
  const [Activity, setActivity] = useState(true);
  function handleSelection(e) {
    console.log(e);
  }

  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getDate()}/${
      tempDate.getMonth() + 1
    }/${tempDate.getFullYear()}`;

    setText(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const [RefValue, setRefValue] = useState('');
  const [data, setdata] = useState({});
  useEffect(() => {
    console.log('useEffect');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User email: ', user.email);
      }
      const subscriber = firestore()
        .collection('Users')
        .where('Email', '==', user.email)
        .onSnapshot(documentSnapshot => {
          console.log(
            'documentSnapshot.docs[0]._ref._documentPath._parts[1]',
            documentSnapshot,
          );
          setRefValue(documentSnapshot.docs[0]._ref._documentPath._parts[1]);
          console.log(
            'User Ref',
            documentSnapshot.docs[0]._ref._documentPath._parts[1],
          );
          let Array = documentSnapshot.docs.map(d => d.data());
          console.log('documentSnapshot.docs.map(d => d.data())',Array[0]);
          // setArraydata(Array[0].Address)

          setdata(Array[0]);
          // setShowDate(Array[0].DateOfBirth)
          console.log("Array[0].DateOfBirth",Array[0].DateOfBirth)
          const date1 = new Date(1660251878);
          console.log("1660251878 Data",date1)
        });
        
      setActivity(false);
    });
    console.log('data after useEffect end');
    // setdata([{label: 'Item 1', value: '1'}]);
  }, []);
  const SubmitEvent = () => {
    console.log(name);
    console.log(Email);
    console.log(text);
    if (name === '' && text === '') {
      Toast.show({
        type: 'error',
        text1: 'Obtenez déjà',
        text2: t('Entrez le nom et la date de naissance'),
      });
    } else {
      firestore()
        .collection('Users')
        // .doc('1cUj8J8eEGyyOzLZS2AN')
        .doc(RefValue)
        .update({
          Name: name,
          // Email: Email,
          DateOfBirth: text,
        })
        .then(() => {
          console.log('User updated!');
          Toast.show({
            type: 'success',
            text1: t('Connexion réussie'),
            text2: t('Profil mis à jour'),
          });
        });
    }
  };
  const ButtonDate = () => {
    var t = new Date(23456789000);
    console.log("ttttt",data)
  }
  return (
    <View style={styles.container}>
      <Curvedheader />
      {Activity === true ? (
        <View style={{justifyContent: 'center', height: '80%'}}>
          <ActivityIndicator size="large" color="#3292E0" style={{}} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.containerStyle} scrollEnabled>
          <Text style={styles.HeadingText}>{t('Modifier votre profil')}</Text>
          <View style={styles.NameInputContainer}>
            <TextInput
              placeholder={data.Name}
              style={styles.InputNam}
              placeholderTextColor={'#BCB8B1'}
              keyboardType={'ascii-capable'}
              onChangeText={newText => setname(newText)}
            />
          </View>
          {/* <View style={styles.NameInputContainer}>
          <TextInput
            placeholder={t('Prénom')}
            style={styles.InputNam}
            placeholderTextColor={'#BCB8B1'}
            keyboardType={'ascii-capable'}
          />
        </View> */}
          <View style={styles.NameInputContainer}>
            <TextInput
              placeholder={data.Email}
              style={styles.InputNam}
              placeholderTextColor={'#BCB8B1'}
              keyboardType={'email-address'}
              onChangeText={newText => setEmail(newText)}
            />
          </View>
          <View style={styles.NameInputContainer}>
            <Text style={[styles.InputNam, {marginTop: 10}]}>{data.Phone}</Text>
          </View>
          {/*  */}
          {/* <View style={styles.inputCountryCustomContainer}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="FR"
            layout="first"
            // withShadow
            // autoFocus
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textInput}
            codeTextStyle={styles.codeTextStyle}
            countryPickerButtonStyle={styles.countryPickerButtonStyle}
            placeholder={t('Téléphone')}
            textInputProps={{placeholderTextColor: '#BCB8B1'}}
            textInputStyle={styles.textInputStyle}
            onChangeFormattedText={text => {
              setphoneNumber(text);
            }}
          />
        </View> */}
          <TouchableOpacity
            style={[styles.NameInputContainer, {marginTop: 10}]}
            onPress={() => {
              showMode('date');
            }}>
            <TextInput
              placeholder={data.DateOfBirth}
              placeholderTextColor={'#BCB8B1'}
              keyboardType={'ascii-capable'}
              style={{
                // backgroundColor: 'tomato',
                color: '#000',
                width: '90%',
                fontSize: 16,
                fontFamily: commonStyle.regular,
                marginLeft: '3%',
              }}
              editable={false}
            />
            {show && (
              <DateTimePicker
                testID="DateTimePicker"
                value={date}
                mode={mode}
                display={'default'}
                onChange={onChange}
              />
            )}
          </TouchableOpacity>
          {/* <View style={{width: '95%'}}>
            <Text style={styles.NoteAlertText}>
              Note: You can't Change Email and Phone Number Because your account
              is associated with Email and Phone Number.
            </Text>
          </View> */}
          
          {/* <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={ButtonDate}>
            <Text style={styles.ButtonText}>{t('Valider')}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={SubmitEvent}>
            <Text style={styles.ButtonText}>{t('Valider')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

export default Profile;
