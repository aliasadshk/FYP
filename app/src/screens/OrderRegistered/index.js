//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import styles from './styles';
import {useTranslation} from 'react-i18next';

// create a component
const OrderedRegistered = () => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <Curvedheader />
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>
          {t('Votre commande est enregistrée')}
        </Text>
      </View>
      <TouchableOpacity style={styles.AddressAndOr}>
        <Text style={styles.AddressAndOrText}>
          {t('Dernière étape :adresse et paiement')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.AddressAndOr}>
        <Text style={styles.AddressAndOrText}>
          {t('Voir l’historique des commandes')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//make this component available to the app
export default OrderedRegistered;
