//import liraries
import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// create a component
const Signup = props => {
  const [modalVisible, setModalVisible] = useState(true);
  const [confirm, setConfirm] = useState(null);
  useEffect(() => {
    reset(
      {Name: '', Phone: '', Password: '', Email: ''},
      {
        keepErrors: true,
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      },
    );
  }, [reset]);

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState();
  const [phoneNumber, setphoneNumber] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, settext] = useState('12/10/1997');
  const {t, i18n} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };
  /* Date functions */
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getDate()}/${
      tempDate.getMonth() + 1
    }/${tempDate.getFullYear()}`;

    settext(fDate);
    console.log(fDate);
  };

  // const resetFields = () => {
  //   setName('');
  //   setEmail('');
  //   setphoneNumber('');
  //   setPassword('');
  //   settext('');
  // };

  /* Navigate to OTP */
  const navigateToOtp = (id,Confirm,Array) => {
    props.navigation.navigate(Navigationstrings.Optcode, {phoneForOTP: id,confirmation:Confirm,Array:Array});
  };
  const TestNav = () => {
    props.navigation.navigate('Optcode');
  };
  /* navigate to term and use */
  const navigateToTermsOfUse = () => {
    props.navigation.navigate(Navigationstrings.TermsOfUse);
  };
  /* when user click on register it will trigger below function */
  const handleSignup = async () => {
    let Array = {Name:Name,Email:Email,DateOfBirth:date,Password:Password}
    console.log('Done from Handle Signup',phoneNumber,"Array is",Array);
    console.log("handleSignup",)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation",confirmation)
    setConfirm(confirmation);
    navigateToOtp(phoneNumber,confirmation,Array);
    // try {
    //   firestore()
    //     .collection('Users')
    //     .add({
    //       Name: Name,
    //       Phone: phoneNumber,
    //       Email: Email,
    //       DateOfBirth: texttext,
    //     })
    //     .then(() => {
    //       console.log('User added!');
    //     });
    // } catch (error) {
    //   console.log(`Error: ${error}`);
    // }
    // try {
    //   auth()
    //     .createUserWithEmailAndPassword(Email, Password)
    //     .then(() => {
    //       try {
    //         AsyncStorage.setItem('authStatusChecker', 'login');
    //       } catch (error) {
    //         console.log('Storage Error from Login Button :', error);
    //       }
    //       console.log('User account create & Signed in!');
    //       Toast.show({
    //         type: 'success',
    //         text1: t('Connexion réussie'),
    //         text2: t('Compte utilisateur créé et connecté !'),
    //       });
    //       setTimeout(() => {
    //         // resetFields();
    //         // reset();
    //         navigateToOtp(phoneNumber);
    //       }, 3000);
    //     })
    //     .catch(error => {
    //       if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //         Toast.show({
    //           type: 'error',
    //           text1: 'Obtenez déjà',
    //           text2: t('Cette adresse email est déjà utilisée!'),
    //         });
    //       }
    //       if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //         Toast.show({
    //           type: 'error',
    //           text1: t('Email invalide!'),
    //           text2: t("L'e-mail fourni n'est pas valide !"),
    //         });
    //       }
    //       Toast.show({
    //         type: 'error',
    //         text1: 'Caught Error',
    //         text2: `Error: ${error}`,
    //       });
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  async function confirmCode() {
    try {
      const con = await confirm.confirm('123456');
      console.log("concon",con)
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const ButtonDate = () => {
    const timestamp = Date.parse(date)
    console.log("timestamptimestamp",timestamp)
    console.log("datedate",date.toString())
  }
  return (
    <LinearGradient colors={['#3885DA', '#3292E0']} style={styles.container}>
      <StatusBar backgroundColor="#3885DA" barStyle="auto" />
      <Text style={styles.signupHeaderText}>{t('Inscription')}</Text>
      <View style={styles.signupView}>
        <Controller
          control={control}
          name="Name"
          rules={{
            required: t('Le nom est requis'),
            minLength: {
              value: 3,
              message: t('Le nom doit comporter 3 caractères'),
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <View
                  style={[
                    styles.inputCustomContainer,
                    {
                      borderBottomColor: error ? 'red' : '#E6E6E6',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  <TextInput
                    placeholder={t('Nom')}
                    placeholderTextColor={'#BCB8B1'}
                    keyboardType={'ascii-capable'}
                    onBlur={onBlur}
                    autoFocus={true}
                    focusable={true}
                    style={styles.inputCustom}
                    value={value}
                    onChange={valueInput => {
                      setName(valueInput.nativeEvent.text.toString());
                      console.log(Name);
                    }}
                    onChangeText={onChange}
                  />
                </View>
                {error && (
                  <Text style={styles.errorMessageTextStyle}>
                    {error.message || t('Erreur')}
                  </Text>
                )}
              </>
            );
          }}
        />
        <Controller
          control={control}
          name="Phone"
          rules={{
            required: t('Le téléphone est requis'),
            minLength: {
              value: 6,
              message: t('Le téléphone doit comporter 6 caractères'),
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <View style={styles.inputCountryCustomContainer}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="FR"
                    layout="first"
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInput}
                    codeTextStyle={styles.codeTextStyle}
                    countryPickerButtonStyle={styles.countryPickerButtonStyle}
                    placeholder={t('Téléphone')}
                    textInputProps={{placeholderTextColor: '#BCB8B1'}}
                    textInputStyle={[
                      styles.textInputStyle,
                      {borderBottomColor: error ? 'red' : '#E6E6E6'},
                    ]}
                    value={phoneNumber}
                    onChangeFormattedText={text => {
                      setphoneNumber(text);
                    }}
                    onChangeText={onChange}
                  />
                </View>
                {error && (
                  <Text
                    style={[
                      styles.errorMessageTextStyle,
                      {textAlign: 'right'},
                    ]}>
                    {error.message || t('Erreur')}
                  </Text>
                )}
              </>
            );
          }}
        />
        <Controller
          control={control}
          name="Email"
          rules={{
            required: t('Email is required'),
            pattern: EMAIL_REGEX,
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <View
                  style={[
                    styles.inputCustomContainer,
                    {
                      borderBottomColor: error ? 'red' : '#E6E6E6',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  <TextInput
                    placeholder={t('E-mail')}
                    placeholderTextColor={'#BCB8B1'}
                    keyboardType={'email-address'}
                    style={styles.inputCustom}
                    value={value}
                    onChange={valueInput => {
                      setEmail(valueInput.nativeEvent.text.toString());
                      console.log(Email);
                    }}
                    onChangeText={onChange}
                  />
                </View>
                {error && (
                  <Text style={styles.errorMessageTextStyle}>
                    {error.message || t('Email is not Valid')}
                  </Text>
                )}
              </>
            );
          }}
        />

        <Controller
          control={control}
          name="Password"
          rules={{
            required: t('Mot de passe requis'),
            minLength: {
              value: 6,
              message: t('Le mot de passe doit comporter 6 caractères'),
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <View
                  style={[
                    styles.inputCustomContainer.alignItems,
                    {
                      borderBottomColor: error ? 'red' : '#E6E6E6',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  <TextInput
                    placeholder={t('Mot de passe')}
                    placeholderTextColor={'#BCB8B1'}
                    keyboardType={'ascii-capable'}
                    secureTextEntry={true}
                    style={styles.inputCustom}
                    value={Password}
                    onChange={valueInput => {
                      setPassword(valueInput.nativeEvent.text.toString());
                      console.log(Password);
                    }}
                    onChangeText={onChange}
                  />
                </View>
                {error && (
                  <Text style={styles.errorMessageTextStyle}>
                    {error.message || t('Erreur')}
                  </Text>
                )}
              </>
            );
          }}
        />

        <Controller
          name="Date"
          control={control}
          // rules={{required: 'Date is Required'}}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.inputCustomLogoContainer}
                  activeOpacity={0.7}
                  onPress={() => {
                    showMode('date');
                  }}>
                  <TextInput
                    placeholder={t('Date de naissance')}
                    placeholderTextColor={'#BCB8B1'}
                    keyboardType={'ascii-capable'}
                    style={styles.inputCustom}
                    value={text}
                    onChange={e => {
                      settext(e.nativeEvent.text.toString());
                    }}
                    onChangeText={onChange}
                    editable={false}
                  />
                  {show && (
                    <DateTimePicker
                      testID="DateTimePicker"
                      value={date}
                      mode={mode}
                      display={'default'}
                      onChange={onDateChange}
                    />
                  )}
                </TouchableOpacity>
                {error && (
                  <Text style={styles.errorMessageTextStyle}>
                    {error.message || 'error'}
                  </Text>
                )}
              </>
            );
          }}
        />
        <TouchableOpacity
          style={styles.Auth1}
          activeOpacity={0.7}
          onPress={handleSubmit(handleSignup)}>
          <Text style={styles.AuthButtonText}>{t("S'inscrire")}</Text>
        </TouchableOpacity>

        <View style={styles.agreeTermTextContainer}>
          <Text style={styles.agreeTermText}>{t('Vous acceptez nos')}</Text>
          
          <TouchableOpacity
            onPress={() => {
              navigateToTermsOfUse();
            }}>
            <Text style={styles.agreeTermUSeText}>
              {' '}
              {t('conditions générales d’utilisation')}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </LinearGradient>
  );
};

//make this component available to the app
export default Signup;
