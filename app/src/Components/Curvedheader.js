//import liraries
import React, {Component,useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import commonStyle from '../helper/commonStyle';
import sd from '../Images/LOGO_GS.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Svg, {Path, G, Defs} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from 'react-native-vector-icons/FontAwesome';
import Navigationstrings from '../../Navigation/Navigationstrings';
// create a component
const Curvedheader = props => {
  const [LocalStogae,setLocalStogae] = useState(null)
  // console.log(position);
  useEffect(() => {
    async function fetchValue() {
      try {
        // currentUser = await AsyncStorage.setItem('@currentUser', user.uid);
        const authStatus = await AsyncStorage.getItem('authStatusChecker');
        setLocalStogae(authStatus)
        console.log('Your authStatus in local storage is : ', authStatus);
        // console.log('Your currentUser in local storage is : ', currentUser);
        // const lan = await AsyncStorage.getItem('lan');
        // console.log('Your lan in local storage is : ', lan);
        // if (lan === null) {
        //   i18n.changeLanguage('fr');
        // } else {
        //   i18n.changeLanguage(lan);
        // }
      } catch (error) {
        console.log('Error is ', error);
      }
    }
    fetchValue();
  }, []);
  return (
    <View style={styles.container}>
      <View onPress={()=>alert("cs")}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={'100%'}
          height={125.365}
          {...props}>
          <Path
            data-name="Path 1"
            d="M428.414 110.922c-252.319 32.5-428.414 0-428.414 0V0h428.414Z"
            fill="#3885DA"
          />
         

          
          <View style={styles.INContainer}>
            <Image style={styles.imageStyler} source={sd} resizeMode="center" />
            <Text style={styles.mainTextStyle}>GS</Text>
          </View>
          
        </Svg>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'tomato',
    alignContent: 'center',
  },
  svgItemsContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',s
  },
  headerStyle: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    borderBottomEndRadius: 250,
    borderBottomLeftRadius: 250,
    transform: [{scaleX: 1.1}],
    zIndex: 1,
  },
  mainTextStyle: {
    fontFamily: commonStyle.Bold,
    fontSize: 18,
    color: '#fff',
  },
  INContainer: {
    width: 110,
    height: windowHeight * 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    marginLeft: 180,
    marginRight: 140,
  },
  imageStyler: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.1,
  },
});

//make this component available to the app
export default Curvedheader;
