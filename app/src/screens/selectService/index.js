//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SVGheader from '../../Components/Curvedheader';
import styles from './styles';
import plane from '../../Images/byPlane.png';
import boat from '../../Images/byBoa.png';
import bd from '../../Images/buyingDemand.png';
import ps from '../../Images/privateSale.png';
import Curvedheader from '../../Components/Curvedheader';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import {useTranslation} from 'react-i18next';

// create a component
const SelectService = ({navigation}) => {
  const {t, i18n} = useTranslation();
  useEffect(() => {
    
  }, []);
  const navigateToCountryDelivery = id => {
    navigation.navigate(Navigationstrings.CountryDelivery, {Value: id});
  };
  const navigateToReturnByServiceScreen = id => {
    navigation.navigate(Navigationstrings.ReturnByService, {Value: id});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Curvedheader />
      <View style={styles.superContainer}>
        <View style={styles.childContainer}>
          <TouchableOpacity
            style={styles.serviceContainer}
            activeOpacity={0.7}
            onPress={() => {
              navigateToCountryDelivery('avion');
            }}>
            <View>
              <Text style={styles.textStylehead}>{t('Fret Par')}</Text>
              <Text style={styles.textStylehead}>{t('avion')}</Text>
            </View>
            <View>
              <Image
                source={plane}
                resizeMode={'contain'}
                style={styles.ImageStyle}
              />
            </View>
            <View>
              <Text style={styles.textStyletail}>{t('Par poids (kg)')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceContainer}
            activeOpacity={0.7}
            onPress={() => {
              navigateToCountryDelivery('bateau');
            }}>
            <View>
              <Text style={styles.textStylehead}>{t('Fret Par')}</Text>
              <Text style={styles.textStylehead}>{t('bateau')}</Text>
            </View>
            <View>
              <Image
                source={boat}
                resizeMode={'contain'}
                style={styles.ImageStyle}
              />
            </View>
            <View>
              <Text style={styles.textStyletail}>{t('par unité')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.childContainer}>
          <TouchableOpacity
            style={styles.serviceContainer}
            activeOpacity={0.7}
            onPress={() => {
              navigateToReturnByServiceScreen('private');
            }}>
            <View>
              <Text style={styles.textStylehead}>{t('Ventes privées')}</Text>
            </View>
            <View>
              <Image
                source={ps}
                resizeMode={'contain'}
                style={styles.ImageStyle}
              />
            </View>
            <View>
              <Text style={styles.textStyletail}>
                {t('Qualité au prix le moins cher')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceContainer}
            activeOpacity={0.7}
            onPress={() => {
              navigateToReturnByServiceScreen('Demand');
            }}>
            <View>
              <Text style={styles.textStylehead}>{t("Demande d'achat")}</Text>
            </View>
            <View>
              <Image
                source={bd}
                resizeMode={'contain'}
                style={styles.ImageStyle}
              />
            </View>
            <View>
              <Text style={styles.textStyletail}>
                {t("N'avoir aucune limite")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles

//make this component available to the app
export default SelectService;
