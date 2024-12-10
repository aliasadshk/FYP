//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sd from '../../Images/LOGO_GS.png';
import styles from './styles';
import i18n from '../../config/i18n/index';

// create a component
const Splash = props => {
  let {authStatus, setAuthStatus} = useState('');
  // const user = firebase.auth().currentUser;

  useEffect(() => {
    // async function fetchValue() {
    //   const authStatus = await AsyncStorage.getItem('authStatusChecker');
    //     setLocalStogae(authStatus)
    //     console.log('Your authStatus in local storage is : ', authStatus);
    //   try {
    //     // currentUser = await AsyncStorage.setItem('@currentUser', user.uid);
    //     authStatus = await AsyncStorage.getItem('authStatusChecker');
    //     console.log('Your authStatus in local storage is : ', authStatus);
    //     // console.log('Your currentUser in local storage is : ', currentUser);
    //     const lan = await AsyncStorage.getItem('lan');
    //     console.log('Your lan in local storage is : ', lan);
    //     if (lan === null) {
    //       i18n.changeLanguage('fr');
    //     } else {
    //       i18n.changeLanguage(lan);
    //     }
    //   } catch (error) {
    //     console.log('Error is ', error);
    //   }
      setTimeout(() => {
        const {navigate} = props.navigation;
        if (authStatus === 'notlogin' || authStatus === null) {
          // navigate(Navigationstrings.Login);
          navigate('Tab');
        } else {
          navigate('Tab');
        }
      }, 3000);
    // }
    // fetchValue();
  }, []);
const DeleteStorage = async () => {
    try {
        await AsyncStorage.removeItem('authStatusChecker');
        console.log("remove");
    }
    catch(exception) {
      console.log("Not Remove");
    }
}
  return (
    <LinearGradient
      colors={['#3885DA', '#29A9EA', '#3A7FD8']}
      style={styles.container}>
      <StatusBar backgroundColor="#3885DA" barStyle="light-content" />
      <View style={styles.INContainer}>
        <Image style={styles.imageStyler} source={sd} resizeMode="center" />
        
        <Text style={styles.mainTextStyle}>GS</Text>
        
      </View>
      <View style={styles.bottomTextView}>
        <TouchableOpacity 
        //</View>onPress={DeleteStorage}
        >
        <Text style={styles.footerTextStyle}>BRL CONSULTING</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

//make this component available to the app
export default Splash;
