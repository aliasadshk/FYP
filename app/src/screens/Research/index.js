//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import Search from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import styles from './styles';

// create a component
const Research = () => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <Curvedheader />
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Search color={'#000'} name="search" size={20} />
        </View>
        <View>
          <TextInput
            placeholder={t('Nom produit, catégorie…')}
            placeholderTextColor="#B0B0C3"
            style={styles.SearchInputStyle}
            keyboardType={'ascii-capable'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default Research;
