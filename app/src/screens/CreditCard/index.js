import {Provider, Surface, ThemeProvider} from 'react-native-paper';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import CountryPicker from 'rn-country-dropdown-picker';
import styles from './styles';
import Header from '../../Components/Curvedheader';
import MasterCard from '../../Images/mastercard.png';
import Visa from '../../Images/visa.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPic from '../../Images/Card.png';
import {useTranslation} from 'react-i18next';
import Curvedheader from '../../Components/Curvedheader';
function CreditCard() {
  const {t, i18n} = useTranslation();
  const [visa, setVisa] = useState(true);
  const [Master, setMaster] = useState(false);

  return (
    <View style={styles.container}>
      <Curvedheader />
      <Text style={styles.HeadingText}>{t('Cartes enregistrées')}</Text>

      <Image source={CardPic} resizeMode="contain" style={styles.CardImage} />

      <Text style={styles.LeftSubHeading}>{t('MES CARTES ENREGITSRÉES')}</Text>
      <View style={styles.CardMainContainer}>
        <View style={styles.CardFeild}>
          <Image
            source={Visa}
            resizeMode="contain"
            style={styles.CardFeildImage}
          />
          <Text style={styles.CardFeildText}>***** 9946</Text>
        </View>
        <Icon
          name={visa === true ? 'dot-circle-o' : 'circle-o'}
          size={22}
          onPress={() => {
            setVisa(true);
            setMaster(false);
          }}
          color="#042C5C"
          style={styles.CardCircle}
        />
      </View>
      <View style={styles.CardMainContainer}>
        <View style={styles.CardFeild}>
          <Image
            source={MasterCard}
            resizeMode="contain"
            style={styles.CardFeildImage}
          />
          <Text style={styles.CardFeildText}>***** 9946</Text>
        </View>
        <Icon
          name={Master === true ? 'dot-circle-o' : 'circle-o'}
          size={22}
          onPress={() => {
            setMaster(true);
            setVisa(false);
          }}
          color="#042C5C"
          style={styles.CardCircle}
        />
      </View>
      <TouchableOpacity style={styles.ButtonContainer}>
        <Text style={styles.ButtonText}>{t('Utiliser cette carte')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreditCard;
