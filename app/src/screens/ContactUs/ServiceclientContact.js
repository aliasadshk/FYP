import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Curvedheader from '../../Components/Curvedheader';
import {useTranslation} from 'react-i18next';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AwesomeLoading from 'react-native-awesome-loading';
function ServiceClientContact(props) {
  const {t, i18n} = useTranslation();
  const [visible, setvisible] = useState(true);
  const [isFocus, setIsFocus] = useState(true);
  const [value, setValue] = useState(null);
  const [Message, setMessage] = useState('');
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
  const [Userdata, setUserdata] = useState([null]);

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
          console.log(
            'documentSnapshot.docs[0]._ref._documentPath._parts[1]',
            documentSnapshot,
          );
          // setRefValue(documentSnapshot.docs[0]._ref._documentPath._parts[1]);
          console.log(
            'User Ref',
            documentSnapshot
          );
          let Array = documentSnapshot.docs.map(d => d.data());
          console.log('documentSnapshot.docs.map(d => d.data())', Array[0]);
          // setArraydata(Array[0].Address)

          setUserdata(Array[0]);
        });
      setvisible(true);
    });
    console.log('data after useEffect end');
    // setdata([{label: 'Item 1', value: '1'}]);
  }, []);
  const SendMessage = () => {
    console.log('new Date().toLocaleString();', new Date().toLocaleString());

    console.log('valuevalue', value);
    console.log('Userdata', Userdata);
    console.log('Message', Message);
    if (value === null && Message === '') {
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
          Name: Userdata.Name,
          Phone: Userdata.Phone,
          Email: Userdata.Email,
          Gender: value,
          Message: Message,
          ID: (Math.random()+1).toString(36).substring(7)
        })
        .then(() => {
          console.log('Message Send');
          Toast.show({
            type: 'success',
            text1: t('Connexion réussie'),
            text2: t('Message envoyé avec succès'),
          });
          props.navigation.navigate('AppSettingsMain' )
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
    props.navigation.navigate('AppSettingsMain' )
    // props.navigation.navigate(Navigationstrings.SuccessFullyRegOrder);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled>
      {
        visible===false?
        <AwesomeLoading indicatorId={8} size={40} isActive={true} text="Please wait" />
      
      :
      <View style={{width:'100%'}}>
       <Curvedheader />
      <Text style={styles.HeadingText}>{t('Service client')}</Text>
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
          placeholder={!isFocus ? '...' : t('Objet')}
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
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.TextInputFeild}
          placeholder="Message"
          placeholderTextColor={'#B0B0C3'}
          multiline={true}
          numberOfLines={50}
          // value={Message}
          onChangeText={newText => setMessage(newText)}
        />
      </View>
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => {
          SendMessage();
        }}>
        <Text style={styles.ButtonText}>{t('Envoyer')}</Text>
      </TouchableOpacity>
      </View>
      }
    </ScrollView>
  );
}

export default ServiceClientContact;
