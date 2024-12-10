//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar,Dimensions, TouchableOpacity} from 'react-native';
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
        <Text style={styles.TextStyle}>Application livreur</Text>
      </View>
      <View style={{marginTop:windowWidth * .45,}}/>
      <TouchableOpacity style={styles.ButtonStyle}>
        <Text style={styles.ButtonStyleText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'tomato',
  },
  INContainer: {
    width: windowWidth * 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: windowHeight * 0.2,
    // backgroundColor: '#000',
  },
  imageStyler: {
    width: windowWidth * 1.0,
    marginTop: windowHeight * 0.32,
  },
  TextStyle:{

  },
  ButtonStyle:{
    backgroundColor: '#FC6011',
    width: windowWidth * .8,
    justifyContent: 'center',
    height:windowHeight * 0.07,
    borderRadius:70
  },
  ButtonStyleText:{
    textAlign: 'center',
    color:'#fff'
  },
});

export default Splash;
