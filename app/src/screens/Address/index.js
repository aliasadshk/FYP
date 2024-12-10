import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import CountryPicker from 'rn-country-dropdown-picker';
import commonStyle from '../../helper/commonStyle';
import Icon from 'react-native-vector-icons/Feather';
import Curvedheader from '../../Components/Curvedheader';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
function Address() {
  const {t, i18n} = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [RefValue, setRefValue] = useState('');
  const [NewAddress, setNewAddress] = useState('');
  const [data, setdata] = useState([]);
  const [Arraydata, setArraydata] = useState([]);
  function handleSelection(e) {
    console.log(e);
  }
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
          console.log('User email: ', documentSnapshot.docs.length);
            setRefValue(documentSnapshot.docs[0]._ref._documentPath._parts[1])
            // setArraydata([{label: 'No Add any address yet', value: '1'}])
          
            setRefValue(documentSnapshot.docs[0]._ref._documentPath._parts[1]);
            console.log(
              'User Ref',
              documentSnapshot.docs[0]._ref._documentPath._parts[1],
            );
            let Array = documentSnapshot.docs.map(d => d.data())
            if(Array[0].Address===undefined){
              console.log('Find Address Array',Array[0].Address);
              setArraydata([{label: '', value: '1'}])
            }
            else{
              console.log('Find Address Array',Array[0].Address);
              setArraydata(Array[0].Address)
            }
            
            
            setdata(documentSnapshot.docs.map(d => d.data()));
          
          
        });
    });
    console.log('data after useEffect end',);
    setdata([{ label: 'Item 1', value: '1' }])
  }, []);
  const GetUser = async () => {
    // Update
    //  const subscriber = firestore()
    //       .collection('Users')
    //       .where('Email', '==', 'abc@gmail.com')
    //       .onSnapshot(documentSnapshot => {
    //         console.log('User data: ', documentSnapshot.docs[0]._ref._documentPath._parts[1]);
    //       });
  };
  const AddAddress = () => {
    if (NewAddress===''){
                Toast.show({
                  type: 'error',
                  text1: 'Obtenez déjà',
            text2: t('Veuillez saisir le champ d adresse'),
          });
    }
    else{
console.log('Add Address', NewAddress);
    // console.log('Math.floor(Math.random() * (100));', Math.floor(Math.random() * (100)));
    // let ArraydataA = [{label: "NewAddress", value: Math.floor(Math.random() * (100)) }]
    let newArray = {label: NewAddress, value: Math.floor(Math.random() * (100)) }
    Arraydata.push(newArray);
    console.log('User updated!',Arraydata);
    firestore()
      .collection('Users')
      // .doc('1cUj8J8eEGyyOzLZS2AN')
      .doc(RefValue)
      .update({
        Address: Arraydata,
      })
      .then(() => {
             Toast.show({
            type: 'success',
            text1: t('Connexion réussie'),
            text2: t('Adresse ajoutée avec succès'),
          });
      });
    }
    
  };
  return (
    <View style={styles.container}>
      <Curvedheader />
      <View style={styles.dropContainerStyle}>
        {console.log('data in render', data)}
        {console.log('ArraydataArraydataArraydata', Arraydata)}
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          autoScroll
          // disable
          // inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerrrrStyle}
          data={Arraydata}
          // search
          maxHeight={320}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? t('Aucune adresse sauvegardée') : '...'}
          // searchPlaceholder="Search..."
          value={value}
          showsVerticalScrollIndicator={false}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={t('Ajoutez l adresse ici')}
          style={styles.inputStyled}
          placeholderTextColor="#B0B0C3"
          keyboardType="ascii-capable"
          keyboardAppearance={'default'}
          onChangeText={newText => setNewAddress(newText)}
        />
      </View>
      <TouchableOpacity style={styles.ButtonContainer} onPress={AddAddress}>
        <Text style={styles.ButtonText}>{t('Adresses')}</Text>
        <Icon name="plus" size={23} color="#042C5C" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ProviderStyle: {},
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    width: '80%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    marginTop: windowHeight * 0.02,
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ButtonText: {
    // marginLeft: '5%',
    width: '78%',
    color: '#042C5C',
    fontSize: 15,
    fontFamily: commonStyle.regular,
  },
  dropContainerStyle: {
    justifyContent: 'center',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.9,
    // borderRadius:0
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
  },

  dropdown: {
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 17,
    backgroundColor: 'rgba(173, 173, 173, 0.2)',
    // elevation: 1,
    width: windowWidth * 0.8,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: commonStyle.regular,
    color: '#14213D',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: commonStyle.regular,
    color: '#14213D',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerrrrStyle: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 100,
    elevation: 10,
  },
  inputContainer: {
    width: windowWidth * 0.8,
    backgroundColor: 'rgba(173, 173, 173, 0.2)',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: '20%',
  },
  inputStyled: {
    width: windowWidth * 0.75,
    marginLeft: windowWidth * 0.03,
    color: '#000',
    fontFamily: commonStyle.regular,
  },
});
export default Address;
