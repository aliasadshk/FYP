//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import {useTranslation} from 'react-i18next';
import styles from './styles';
// create a component
const OrderValidated = () => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <Curvedheader />
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}>{t('Commande validée')}</Text>
      </View>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btnText}>{t('Revenir à l’accueil')}</Text>
      </TouchableOpacity>
    </View>
  );
};

//make this component available to the app
export default OrderValidated;
