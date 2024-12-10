//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navigationstrings from '../../../../Navigation/Navigationstrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sd from '../../../Images/cablogo.png';
import i18n from '../../../config/i18n/index';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import commonStyle from '../../../helper/commonStyle';
// create a component
const Splash = props => {
  let {authStatus, setAuthStatus} = useState('');
  // const user = firebase.auth().currentUser;


  return (
    <View
      style={styles.container}>
      <View style={styles.INContainer}>
        <Image style={styles.imageStyler} source={sd} resizeMode="center" />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'tomato',
  },
  MainTextContainer: {},
  mainTextStyle: {
    fontFamily: commonStyle.regular,
    fontSize: 34,
    color: '#fff',
    marginTop: 10,
  },
  bottomTextView: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
    // backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTextStyle: {
    fontFamily: commonStyle.regular,
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },

  INContainer: {
    width: windowWidth * 1.0,
    height: windowHeight * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: windowHeight * 0.2,
    // backgroundColor: '#000',
  },
  imageStyler: {
    width: windowWidth * 1.0,
    height: windowHeight * 0.9,
  },
});

export default Splash;
