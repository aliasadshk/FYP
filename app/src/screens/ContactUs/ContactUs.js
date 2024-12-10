import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CountryPicker from 'rn-country-dropdown-picker';
import styles from './styles';
import Curvedheader from '../../Components/Curvedheader';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import PhoneInput from 'react-native-phone-number-input';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import Toast from 'react-native-toast-message';
function ContactUs(props) {
  const {t, i18n} = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const data = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];
  function handleSelection(e) {
    console.log(e);
  }

  const navigateToCofirmSentScreen = () => {
    console.log('new Date().toLocaleString();', new Date().toLocaleString())
    console.log('Name', Name);
    console.log('Email', Email);
    console.log('valuevalue', value);
    console.log('phoneNumber', phoneNumber);
    console.log('Message', Message);
    if (Email === '' && Name === '' && value === null && Message === '') {
      Toast.show({
        type: 'error',
        text1: 'Obtenez déjà',
        text2: t('Il y a une erreur'),
      });
    } else {
      firestore()
        .collection('MessageUser')
        .add({
          createdDate: new Date().toLocaleString(),
          Name: Name,
          Phone: phoneNumber,
          Email: Email,
          Gender: value,
          Message: Message,
          ID: (Math.random()+1).toString(36).substring(7)
        })
        .then(() => {
          console.log('Message Send');
          props.navigation.navigate(Navigationstrings.ConfirmSent);
        })
        .catch(error => {
          console.err('error', error);
          Toast.show({
            type: 'error',
            text1: 'Obtenez déjà',
            text2: t('Il y a une erreur'),
          });
        });
    }
  };

  const phoneInput = useRef(null);
  const buttonPress = () => {
    Alert.alert(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Curvedheader />
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        scrollEnabled
        showsVerticalScrollIndicator={false}>
        <Text style={styles.HeadingText}>{t('Nous contacter')}</Text>
        <View style={styles.NameInputContainer}>
          <TextInput
            placeholder={t('Nom')}
            style={styles.InputNam}
            placeholderTextColor="#B0B0C3"
            keyboardType="ascii-capable"
            onChangeText={newText => setName(newText)}
          />
        </View>
        <View style={styles.NameInputContainer}>
          <TextInput
            placeholder={t('E-mail')}
            style={styles.InputNam}
            placeholderTextColor="#B0B0C3"
            keyboardType="email-address"
            onChangeText={newText => setEmail(newText)}
          />
        </View>
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
            data={data}
            // search
            maxHeight={155}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? t('Objet') : '...'}
            // searchPlaceholder="Search..."
            value={value}
            showsVerticalScrollIndicator={false}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
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

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.TextInputFeild}
            placeholder="Message"
            // scrollEnabled={false}
            multiline={true}
            numberOfLines={50}
            placeholderTextColor="#B0B0C3"
            keyboardType="ascii-capable"
            onChangeText={newText => setMessage(newText)}
          />
        </View>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={() => {
            navigateToCofirmSentScreen();
          }}>
          <Text style={styles.ButtonText}>{t('Envoyer')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ContactUs;
