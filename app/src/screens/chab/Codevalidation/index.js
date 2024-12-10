//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar,Dimensions, TouchableOpacity, TextInput} from 'react-native';
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
      <Text style={styles.Heading}>Code de validation</Text>
      <Text style={styles.SubHeading}>Un code de validation a été envoyé par SMS au client
Pour confirmation de votre arrivée,
veuillez l’entrer dans le champ suivant</Text>
      <View style={styles.TextContainer}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder='Code'
          />
      </View>
      <View style={{marginTop:windowWidth * .09,}}/>
      <TouchableOpacity style={styles.ButtonStyle}>
        <Text style={styles.ButtonStyleText}>Valider livraison</Text>
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
  Heading:{
color:'#4A4B4D',
fontSize:30,
marginTop:windowHeight * 0.07,
  },
  SubHeading:{
    olor:'#4A4B4D',
    fontSize:14,
    marginTop:windowHeight * 0.02,
    marginBottom:windowHeight * 0.03,
    width:'80%'
},
  ButtonStyle:{
    backgroundColor: '#FC6011',
    width: windowWidth * .85,
    justifyContent: 'center',
    height:windowHeight * 0.07,
    borderRadius:70
  },
  ButtonStyleText:{
    textAlign: 'center',
    color:'#fff'
  },
  TextContainer:{
    marginTop:windowHeight * 0.03,
    backgroundColor: '#F2F2F2',
    width: windowWidth * .85,
    justifyContent: 'center',
    height:windowHeight * 0.075,
    borderRadius:70
  },
  TextInputStyle:{
    marginLeft:20,
    width: windowWidth * .74,
    height:windowHeight * 0.075,
  },
});

export default Splash;
