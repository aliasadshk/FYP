import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CountryPicker from 'rn-country-dropdown-picker';
import commonStyle from '../../helper/commonStyle';
import Icon from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import Curvedheader from '../../Components/Curvedheader';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import {useTranslation} from 'react-i18next';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { changeLanguage } from 'i18next';
function DeliveryMethodsU(props) {
  const {t, i18n} = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  // const [UserAddress, setUserAddress] = useState(null);
  const [RefValue, setRefValue] = useState('');
  const [UserAddress, setUserAddress] = useState([]);
  const [StoreAddress, setStoreAddress] = useState([]);
  const [counter, setcounter] = useState(0);
  const [DataArray, setDataArray] = useState({newPrice: 0});
  const [Activity, setActivity] = useState(true);
  useEffect(() => {
    const navVar = props.route.params.basketarray;
    setDataArray(props.route.params.basketarray);
    setcounter(props.route.params.selectItem);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      }
      const subscriber = firestore()
        .collection('Users')
        .where('Email', '==', user.email)
        .onSnapshot(documentSnapshot => {
          setRefValue(documentSnapshot.docs[0]._ref._documentPath._parts[1]);
        
          let Array = documentSnapshot.docs.map(d => d.data());
          setUserAddress(Array[0].Address);
        });
      const StoreAddress = firestore()
        .collection('StoreAddress')

        .onSnapshot(documentSnapshot => {
     
          let datacome = documentSnapshot.docs.map(d => d.data());
          console.log("useEffectuseEffect",datacome.map(ls=>ls.Address[0]))
          setStoreAddress(datacome.map(ls=>ls.Address[0]));
        });
    });
    setActivity(false)
  }, [0]);
  function handleSelection(e) {
  }
  const [isFocus1, setIsFocus1] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const data1 = [
    {
      label: 'Address 1',
      value: 'Address 1',
    },
    {
      label: 'Address 2',
      value: 'Address 2',
    },
  ];
  function handleSelection1(e) {
  }
  const NavigateToPaymentMEthodsScreen1 = () => {
    if(value===null){
      Alert.alert('Missing',"Please select the Address of Store")
    }
    else{
      let otherInformation = {Address:value,phoneNumber:phoneNumber,basketValue:counter,DeliveryType:"At Store"}
      console.log(otherInformation)
      props.navigation.navigate(Navigationstrings.PickupWindow,{basketarray:props.route.params.basketarray,otherInformation:otherInformation,TotalPrice:props.route.params.TotalPrice});
    }

  
    // let newArray = [{label: "West Paris Road France", value: Math.floor(Math.random() * (100)) }]
    // firestore()
    //   .collection('StoreAddress')
    //   .doc('Y0hIidCZQr9LTP0fNPtl')
    //   // .doc(RefValue)
    //   .update({
    //     Address: newArray,
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
  };
  const NavigateToPaymentMEthodsScreen2 = () => {
    if(value1===null){
      Alert.alert('Missing',"Please select the Address of your home")
    }
    else if(phoneNumber===''){
      Alert.alert('Missing',"Please enter your phone number")
    }
    else{
      let otherInformation = {Address:value1,phoneNumber:phoneNumber,basketValue:counter,DeliveryType:'Home'}
      props.navigation.navigate(Navigationstrings.PickupWindow,{basketarray:props.route.params.basketarray,otherInformation:otherInformation,TotalPrice:props.route.params.TotalPrice});
    }
   
    // let newArray = [{label: "West Paris Road France", value: Math.floor(Math.random() * (100)) }]
    // firestore()
    //   .collection('StoreAddress')
    //   .doc('Y0hIidCZQr9LTP0fNPtl')
    //   // .doc(RefValue)
    //   .update({
    //     Address: newArray,
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
  };
  // const NavigateToPaymentMEthodsScreen = () => {
  //   console.log('phoneNumber', phoneNumber);
  //   console.log(
  //     'props.route.params.basketarray',
  //     props.route.params.basketarray,
  //   );
  //   console.log('phoneNumber', phoneNumber);
  //   console.log('value1', value1);
  //   console.log('value', value);
  //   props.navigation.navigate(Navigationstrings.PickupWindow,{basketarray:props.route.params.basketarray});
    
  // };
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <Curvedheader />
      {Activity === true ? (
        <View style={{justifyContent: 'center', height: '80%'}}>
          <ActivityIndicator size="large" color="#3292E0" style={{}} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <Text style={styles.Heading}>{t('Modes de livraison')}</Text>
          <Text style={styles.SecondHeading}> {t('Au magasin (gratuit)')}</Text>
          
          <View style={styles.dropContainerStyle}>
            {console.log("StoreAddress",StoreAddress)}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              autoScroll
              // disable
              // inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerrrrStyle}
              data={StoreAddress}
              // search
              maxHeight={220}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? t('Liste des magasins') : '...'}
              // searchPlaceholder="Search..."
              value={StoreAddress}
              showsVerticalScrollIndicator={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            />
          </View>

          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => {
              NavigateToPaymentMEthodsScreen1();
            }}>
            <Text style={styles.ButtonStyleText}>
              {t('Valider livraison au magasin')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.domicileStyle}>{t('A domicile')}</Text>
          <TouchableOpacity style={styles.ButtonContainer}>
            <Text style={styles.ButtonText}>{t('Valider')}</Text>
            <Icon name="plus" size={23} color="#000" style={{marginTop: 13}} />
          </TouchableOpacity>
          <View style={styles.dropContainerStyle}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              autoScroll
              // disable
              // inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerrrrStyle}
              data={UserAddress}
              // search
              maxHeight={120}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? t('Aucune adresse sauvegardée') : '...'}
              // searchPlaceholder="Search..."
              value={UserAddress}
              showsVerticalScrollIndicator={false}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setValue1(item);
                setIsFocus1(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            />
          </View>
          <View style={styles.inputCountryCustomContainer}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="FR"
              layout="first"
              // withShadow
              // autoFocus
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              codeTextStyle={styles.codeTextStyle}
              countryPickerButtonStyle={styles.countryPickerButtonStyle}
              placeholder={t('Téléphone')}
              textInputProps={{placeholderTextColor: '#BCB8B1'}}
              textInputStyle={styles.textInputStyle}
              onChangeFormattedText={text => {
                setphoneNumber(text);
              }}
            />
          </View>
        
          <View style={styles.TotalContainer}>
            <Text style={styles.TotalText}>Total</Text>
            <Text style={styles.PriceText}>
              {props.route.params.basketarray.newPrice * counter}€
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.ButtonStyle, {width: '75%', marginTop: 10}]}
            onPress={() => {
              NavigateToPaymentMEthodsScreen2();
            }}>
            <Text style={styles.ButtonStyleText}>
              {t('Valider livraison à domicile')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
export default DeliveryMethodsU;
