import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import CountryPicker from 'rn-country-dropdown-picker';
import styles from './styles';
import Header from '../../Components/Curvedheader';
import Curvedheader from '../../Components/Curvedheader';
import {useTranslation} from 'react-i18next';
function ConfirmSent(props) {
  const {t, i18n} = useTranslation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const genderList = [
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
  const NavigationHome = () => {
    props.navigation.navigate('Home', { screen: 'SelectService' })
  }
  return (
    <View style={styles.container}>
      <Curvedheader />
      <Text style={[styles.HeadingText, {marginTop: 50, marginBottom: 20}]}>
        {t('Votre message a été transmis')}
      </Text>

      <TouchableOpacity style={[styles.ButtonContainer, {width: '55%'}]} onPress={NavigationHome}>
        <Text style={styles.ButtonText}>{t('Revenir à l’accueil')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ConfirmSent;
