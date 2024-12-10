  //import liraries
  import React, {Component, useState, useRef} from 'react';
  import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  import styles from './styles';
  import sd from '../../Images/LOGO_GS.png';
  import profileLogo from '../../Images/profil.png';
  import lockLogo from '../../Images/lock_black_24dp.png';
  import auth from '@react-native-firebase/auth';
  import Lock from 'react-native-vector-icons/Fontisto';
  import Eye from 'react-native-vector-icons/Entypo';
  import hideSeekLogo from '../../Images/Shape.png';
  import Toast from 'react-native-toast-message';
  import LinearGradient from 'react-native-linear-gradient';
  import Navigationstrings from '../../../Navigation/Navigationstrings';
  import {Controller, useForm} from 'react-hook-form';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useTranslation} from 'react-i18next';
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // create a component
  const Login = props => {
    const [showPass, setshowPass] = useState('eye-with-line');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState();
    const {t, i18n} = useTranslation();

    const {
      control,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      defaultValues: {Email: '', Password: ''},
    });

    const changeIcon = () => {
      setshowPass(showPass === 'eye' ? 'eye-with-line' : 'eye');
    };

    const navigateToSignup = () => {
      props.navigation.navigate(Navigationstrings.Signup);
    };

    const NavigateToMain = () => {
      props.navigation.push('Tab');
      // props.navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'SelectService',
      //       // params: {someParam: 'Param1'},
      //     },
      //   ],
      // });
    };

    const handleSignin = async () => {
      console.log('Done from Handle Signin');

      try {
        auth()
          .signInWithEmailAndPassword(Email, Password)
          .then(() => {
            try {
              AsyncStorage.setItem('authStatusChecker', 'login');
            } catch (error) {
              console.log('Storage Error from Login Button :', error);
            }
            console.log('User account Signed in!');
            Toast.show({
              type: 'success',
              text1: t('Succès'),
              text2: t('Connexion réussie'),
            });
            setTimeout(() => {
              NavigateToMain();
            }, 3000);
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              console.log('Password is Wrong!');
              Toast.show({
                type: 'error',
                text1: t('Mauvais mot de passe'),
                text2: t('Le mot de passe que vous saisissez est erroné !'),
              });
            }
            if (error.code === 'auth/user-not-found') {
              console.log('User not found!');
              Toast.show({
                type: 'error',
                text1: t('Utilisateur non trouvé!'),
                text2: t(
                  "Il n'y a pas d'utilisateur existant correspondant aux informations d'identification !",
                ),
              });
            }
            if (error.code === 'auth/invalid-email') {
              console.log('Email is Invalid!');
              Toast.show({
                type: 'error',
                text1: t('Email invalide!'),
                text2: t("L'e-mail fourni n'est pas valide !"),
              });
            }
            if (error.code === 'auth/invalid-password') {
              console.log('User not found!');
              Toast.show({
                type: 'error',
                text1: t('Mot de passe incorrect!'),
                text2: t("Le mot de passe fourni n'est pas valide !"),
              });
            }
            console.error('ERRRRRORR', error);
          });
      } catch (err) {
        console.log('hmm', err);
      }
    };

    return (
      <LinearGradient
        colors={['#3885DA', '#29A9EA', '#3A7FD8']}
        style={styles.container}>
        <View style={styles.INContainer}>
          <StatusBar backgroundColor="#3885DA" barStyle="auto" />
          <Image style={styles.imageStyler} source={sd} resizeMode="center" />
          <Text style={styles.mainTextStyle}>GS</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            name="Email"
            control={control}
            rules={{required: t("L'e-mail est requis"), pattern: EMAIL_REGEX}}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
              return (
                <>
                  <View
                    style={[
                      styles.inputNumbCustom,
                      {
                        borderColor: error ? 'red' : '#fff',
                        borderWidth: error ? 1 : 0,
                      },
                    ]}>
                    <Image style={styles.profileLogo} source={profileLogo} />
                    <TextInput
                      placeholder={t('E-mail')}
                      style={styles.inputNumbStyled}
                      placeholderTextColor="#B0B0C3"
                      keyboardType="ascii-capable"
                      keyboardAppearance="default"
                      autoCapitalize="none"
                      focusable={true}
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
                      {error.message || t("L'email n'est pas valide")}
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
                      styles.inputCustom,
                      {
                        borderColor: error ? 'red' : '#fff',
                        borderWidth: error ? 1 : 0,
                      },
                    ]}>
                    {/* <Image style={styles.profileLogo} source={lockLogo} /> */}
                    <Lock name="locked" color={'#042C5C'} size={20} />
                    <TextInput
                      placeholder={t('Mot de passe')}
                      style={styles.inputStyled}
                      placeholderTextColor="#B0B0C3"
                      keyboardType="ascii-capable"
                      secureTextEntry={showPass === 'eye' ? false : true}
                      keyboardAppearance={'default'}
                      value={value}
                      onChange={valueInput => {
                        setPassword(valueInput.nativeEvent.text.toString());
                        console.log(Password);
                      }}
                      onChangeText={onChange}
                    />
                    <Eye
                      name={showPass}
                      color={'#042C5C'}
                      size={20}
                      onPress={() => {
                        changeIcon();
                      }}
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
        </View>
        <TouchableOpacity style={styles.forgotPassContainer} activeOpacity={0.7}>
          <Text style={styles.forgotText}>{t('Mot de passe oublié ?')}</Text>
        </TouchableOpacity>
        <View style={styles.mainAuthBContain}>
          <TouchableOpacity
            style={styles.Auth1}
            activeOpacity={0.7}
            onPress={handleSubmit(handleSignin)}>
            <Text style={styles.AuthButtonText}>{t('Se connecter')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Auth1}
            activeOpacity={0.7}
            onPress={navigateToSignup}>
            <Text style={styles.AuthButtonText}>
              {t('Pas de compte ? S’inscrire')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Auth1}
            activeOpacity={0.7}
            onPress={()=>props.navigation.push('Tab')}>
            <Text style={styles.AuthButtonText}>
              {t('Passer l identification')}
            </Text>
          </TouchableOpacity>
          
        </View>
      </LinearGradient>
    );
  };

  //make this component available to the app
  export default Login;
