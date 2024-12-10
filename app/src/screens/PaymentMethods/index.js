//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import Curvedheader from '../../Components/Curvedheader';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
// create a component
const PaymentMethods = props => {
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const navVar = props.route.params.basketarray;
    console.log(
      'basketarraybasketarray',
      props.route.params.TotalPrice,
      navVar,
    );
    console.log(
      'props.route.params.otherInformation',
      props.route.params.otherInformation,
    );
  }, [0]);
  const navigateToPickupDateScreen = () => {
    props.navigation.navigate(Navigationstrings.PaymentDetails);
    props.navigation.navigate(Navigationstrings.PaymentDetails, {
      basketarray: props.route.params.basketarray,
      otherInformation: props.route.params.otherInformation,
      TotalPrice: props.route.params.TotalPrice,
    });
  };
  const navigateToSuccessFullyRegOrder = () => {
    props.navigation.navigate(Navigationstrings.SuccessFullyRegOrder);
  };
  const navigateToMobile = () => {
    const StoreAddress = firestore()
      .collection('Paymobile')
      .onSnapshot(documentSnapshot => {
        let datacome = documentSnapshot.docs.map(d => d.data())
        // setStoreAddress(datacome.map(ls=>ls.Address[0]));
        console.log('datacome', datacome[0].name);
        props.navigation.navigate(Navigationstrings.SuccessFullyRegOrder, {
          string: datacome[0].name,
        });
      });
  };
  const navigateToHomePickup = () => {
    const StoreAddress = firestore()
      .collection('Paydelivery')
      .onSnapshot(documentSnapshot => {
        let datacome = documentSnapshot.docs.map(d => d.data())
        // setStoreAddress(datacome.map(ls=>ls.Address[0]));
        console.log('datacome', datacome[0].name);
        props.navigation.navigate(Navigationstrings.SuccessFullyRegOrder, {
          string: datacome[0].name,
        });
      });
  };
  const navigateToPaybyStore = () => {
    const StoreAddress = firestore()
      .collection('Paydepositstore')
      .onSnapshot(documentSnapshot => {
        let datacome = documentSnapshot.docs.map(d => d.data())
        // setStoreAddress(datacome.map(ls=>ls.Address[0]));
        console.log('datacome', datacome[0].name);
        props.navigation.navigate(Navigationstrings.SuccessFullyRegOrder, {
          string: datacome[0].name,
        });
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled>
      <Curvedheader />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{t('Moyen de paiement')}</Text>
      </View>
      <View style={styles.superMethodsContainer}>
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          onPress={() => {
            navigateToPickupDateScreen();
          }}>
          <Text style={styles.PaymentMethodText}>
            {t('Payer par carte bancaire')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          onPress={() => {
            navigateToMobile();
          }}>
          <Text style={styles.PaymentMethodText}>
            {t('Payer par mobile money ou transfer d’agent')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          onPress={() => {
            navigateToHomePickup();
          }}>
          <Text style={styles.PaymentMethodText}>
            {t('Payer à l’enlèvement à domicile')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          onPress={() => {
            navigateToPaybyStore();
          }}>
          <Text style={styles.PaymentMethodText}>
            {t('Payer au dépôt au magasin')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//make this component available to the app
export default PaymentMethods;
