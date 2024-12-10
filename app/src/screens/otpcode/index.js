//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const CELL_COUNT = 6;
// create a component
const Optcode = ({navigation, route}) => {
  const [confirm, setConfirm] = useState(null);
  const [dataprevios, setdataprevios] = useState('');
  useEffect(() => {
    const phoneForOTP = route.params.phoneForOTP;
    const confirmation = route.params.confirmation;
    setdataprevios(phoneForOTP);
    setConfirm(confirmation)
  }, []);

  const {t, i18n} = useTranslation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const NavigateToMain = () => {
    navigation.navigate('Login');
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'Tab',
    //       // params: {someParam: 'Param1'},
    //     },
    //   ],
    // });
  };
  async function confirmCode() {
    try {
      const con = await confirm.confirm(value);
      console.log("concon",con)
      try {
      firestore()
        .collection('Users')
        .add({
          Name: route.params.Array.Name,
          Phone: route.params.phoneForOTP,
          Email: route.params.Array.Email,
          DateOfBirth: route.params.Array.DateOfBirth.toString(),
          ID: auth().currentUser.uid
        })
        .then((res) => {
          console.log('resres',res)
          Toast.show({
            type: 'success',
            text1: t('Connexion réussie'),
            text2: t('Compte utilisateur créé et connecté !'),
          });
        });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    try {
      auth()
        .createUserWithEmailAndPassword(route.params.Array.Email,route.params.Array.Password)
        .then(() => {
          try {
            AsyncStorage.setItem('authStatusChecker', 'login');
          } catch (error) {
            console.log('Storage Error from Login Button :', error);
          }
          console.log('User account create & Signed in!');
          Toast.show({
            type: 'success',
            text1: t('Connexion réussie'),
            text2: t('Compte utilisateur créé et connecté !'),
          });
          setTimeout(() => {
            // alert('Register!'),
      NavigateToMain()
          }, 3000);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Toast.show({
              type: 'error',
              text1: 'Obtenez déjà',
              text2: t('Cette adresse email est déjà utilisée!'),
            });
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Toast.show({
              type: 'error',
              text1: t('Email invalide!'),
              text2: t("L'e-mail fourni n'est pas valide !"),
            });
          }
          Toast.show({
            type: 'error',
            text1: 'Caught Error',
            text2: `Error: ${error}`,
          });
        });
    } catch (err) {
      console.log(err);
    }
      
    } catch (error) {
      alert("Invalid code.")
      console.log('Invalid code.',error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>{t('Vérification du compte')}</Text>
        <View>
          <Text style={styles.lowerText}>
            {t('Entrez les 4 chiffres du code que vous avez reçu par SMS au')} 
            {dataprevios}
          </Text>
        </View>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity
          style={styles.resendCodeTextContainer}
          activeOpacity={0.7}>
          <Text style={styles.resendCodeText}>{t('Me renvoyer un code')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCountineContainer}
          activeOpacity={0.7}
          onPress={() => {
            confirmCode()
          }}>
          <Text style={styles.ContinuerText}>{t('Continuer')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//make this component available to the app
export default Optcode;
