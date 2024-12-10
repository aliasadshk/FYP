//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar,Dimensions, TouchableOpacity, TextInput} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
const Splash = props => {
  let {authStatus, setAuthStatus} = useState('');
  // const user = firebase.auth().currentUser;


  return (
    <View
      style={styles.container}>
      <Text style={styles.Heading}>Connexion</Text>
      <Text style={styles.SubHeading}>Veuillez entrer vos identifiants</Text>
      <View style={styles.TextContainer}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder='E-mail'
          />
      </View>
      <View style={styles.TextContainer}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder='Mot de passe'
          />
      </View>
      <View style={{marginTop:windowWidth * .09,}}/>
      <TouchableOpacity style={styles.ButtonStyle} onPress={()=>props.navigation.navigate('Dreawer')}>
        <Text style={styles.ButtonStyleText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Heading:{
color:'#4A4B4D',
fontSize:30,
marginTop:windowHeight * 0.07,
  },
  SubHeading:{
    olor:'#4A4B4D',
    fontSize:14,
    marginTop:windowHeight * 0.04,
    marginBottom:windowHeight * 0.03,
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
    marginTop:windowHeight * 0.04,
    backgroundColor: '#F2F2F2',
    width: windowWidth * .85,
    justifyContent: 'center',
    height:windowHeight * 0.075,
    borderRadius:70
  },
  TextInputStyle:{
    paddingLeft:30
  },
});

export default Splash;
