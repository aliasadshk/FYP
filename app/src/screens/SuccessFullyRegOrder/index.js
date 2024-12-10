//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Navigationstrings from '../../../Navigation/Navigationstrings';

// create a component
const SuccessFullyRegOrder = props => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <Curvedheader />
      <View style={styles.textHeadingContainer}>
        {/* <Text style={styles.textHeading}>{t('Commande enregistrée')}</Text> */}
        <Text>{props.route.params.string}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => props.navigation.navigate(Navigationstrings.WeightCal)}>
        <Text style={styles.btnText}>{t('Revenir à l’accueil')}</Text>
      </TouchableOpacity>
    </View>
  );
};

//make this component available to the app
export default SuccessFullyRegOrder;
