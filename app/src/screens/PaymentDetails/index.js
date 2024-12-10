//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {URLSearchParams} from 'react-native-url-polyfill';
import Curvedheader from '../../Components/Curvedheader';
import Edit from 'react-native-vector-icons/Octicons';
import Date from 'react-native-vector-icons/Fontisto';
import Cross from 'react-native-vector-icons/Entypo';
import cardTypes from '../../Images/paiement-method.png';
import styles from './styles';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import {t} from 'i18next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
// create a component
const PaymentDetails = props => {
  const navigateToOrderVailidated = () => {
    props.navigation.navigate(Navigationstrings.OrderValidated);
  };
  const [editCancel1, setEditCancel1] = useState(true);
  const [editCancel2, setEditCancel2] = useState(true);
  const [editCancel3, setEditCancel3] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryM, setexpiryM] = useState('');
  const [expiryY, setexpiryY] = useState('');
  const [cvc, setcvc] = useState('');
  const [disable, setDisable] = useState(true);
  const [paymentMethodId, setpaymentMethodId] = useState('');
  const [paymentIntentId, setpaymentIntentId] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    console.log("props.route.paramsprops.route.params",props.route.params)
    firestore()
      .collection('Users')
      .where('Email', '==', auth().currentUser.email)
      .get()
      .then(res => {
        console.log(res);
        res.forEach(ls => {
          console.log(ls._data.Name);
          setName(ls._data.Name);
        });
      });
  }, []);

  // Add Payment methods

  const handleConfirmation = async () => {
    const Api_url = 'https://api.stripe.com//v1/payment_methods',
      REQ_URL = new URL(Api_url);
    const data = Object.entries({
        type: 'card',
        'card[exp_month]': expiryM,
        'card[exp_year]': expiryY,
        'card[number]': cardNumber,
        'card[cvc]': cvc,
      }),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,

      redirect: 'follow',
    };

    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert(result.error.message);
          // console.log(result.error)
        } else {
          setpaymentMethodId(result.id);
          setDisable(false);
        }
      })
      .catch(error => alert(error));
  };

  // Confirm payment Function

  const confirmPayment = paymentIntent => {
    console.log("paymentIntent",paymentIntent)
    const Api_url = `https://api.stripe.com//v1/payment_intents/${paymentIntent}/confirm`,
      REQ_URL = new URL(Api_url);
    const data = Object.entries({payment_method: paymentMethodId}),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    let url;
    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        url = result.charges.data.map(item => {
          return {url1: item.receipt_url};
        });
      })
      .then(() => {
        console.log(url[0].url1);
        setDisable(true);
        firestore()
          .collection('Orders')
          .add({
            ProductName: props.route.params.basketarray.productName,
            Address: props.route.params.otherInformation.Address.label,
            Price: props.route.params.TotalPrice,
            ShipmentMethod: props.route.params.basketarray.shipMeth,
            PhoneNumber: props.route.params.otherInformation.phoneNumber,
            ShipCountry: props.route.params.basketarray.shipCountry,
            ProductStatus:
              props.route.params.basketarray.stateValue === null
                ? 'new'
                : props.route.params.basketarray.stateValue,
            Status: 'Paid',
            Date: props.route.params.basketarray.Date,
            ReciptUrl: url[0].url1,
            DeliveryType: props.route.params.otherInformation.DeliveryType,
            Category: props.route.params.basketarray.Category,
            // User Information
            Name: name,
            Email: auth().currentUser.email,
            Uid: auth().currentUser.uid,
            ID: Math.floor(Math.random() * 10000 ),
          });
        return Alert.alert(
          'Success',
          'Your ordered has been placed successfully',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancel pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                Clipboard.setString(url[0].url1),
                  props.navigation.navigate(Navigationstrings.WeightCal);
              },
            },
          ],
        );
      })
      .catch(error => console.log('error', error));
  };

  // Payment Intent function

  const handlePaymnetIntent = () => {
    const Api_url = 'https://api.stripe.com//v1/payment_intents',
      REQ_URL = new URL(Api_url);
    const data = Object.entries({
        amount: props.route.params.TotalPrice * 100,
        currency: 'eur',
        payment_method: paymentMethodId,
        receipt_email: auth().currentUser.email,
      }),
      params = new URLSearchParams(data);
    REQ_URL.search = params;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer sk_test_51L16rICwcmjjhlmkuCWEyqY6xpwjUpppgHzAjzgNPIR3QXDN0QZIomOAt9htEGhrswQgEi0w6tRgRVsFRdX2MI5F000BUchz3r',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(REQ_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          alert(result.error.message);
        } else {
          setpaymentIntentId(result.id);
          console.log('RESULT IS : ', result);
          return Alert.alert(
            'Confirm',
            'Do you want to confirm this payment?',
            [
              {
                text: 'Cancel',
                onPress: () => setDisable(true),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => confirmPayment(result.id)},
            ],
          );
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Curvedheader />
        <Text style={styles.headingText}>
          {t('Vous devriez Payer')} ({props.route.params.TotalPrice})
        </Text>
        <View style={styles.PaymentInputsContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.logoContainer}>
              <Cross name="email" size={20} color={'#D3DCEF'} />
            </View>
            <View>
              <TextInput
                placeholder={t('Email')}
                placeholderTextColor="#CED2F5"
                style={styles.inputStyle}
                editable={editCancel1 ? false : true}
                value={auth().currentUser.email}
              />
            </View>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => {
                setEditCancel1(!editCancel1);
              }}>
              {editCancel1 ? (
                <Edit color={'#D3DCEF'} name="pencil" size={20} />
              ) : (
                <Cross name="cross" size={20} color={'#D3DCEF'} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.logoContainer}>
              <Cross name="credit-card" size={20} color={'#D3DCEF'} />
            </View>
            <View>
              <TextInput
                placeholder={t('Name')}
                placeholderTextColor="#CED2F5"
                style={styles.inputStyle}
                editable={editCancel3 ? false : true}
                value={name}
              />
            </View>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => {
                setEditCancel3(!editCancel3);
              }}>
              {editCancel3 ? (
                <Edit color={'#D3DCEF'} name="pencil" size={20} />
              ) : (
                <Cross name="cross" size={20} color={'#D3DCEF'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputContainer, {marginVertical: 8}]}>
          <TextInput
            placeholder={t('Card Number')}
            placeholderTextColor="#CED2F5"
            style={styles.inputStyle}
            onChangeText={text => setCardNumber(text)}
            keyboardType="number-pad"
            maxLength={16}
          />
        </View>
        <View style={[styles.inputContainer, {marginVertical: 8}]}>
          <TextInput
            placeholder={t('Expiry Month')}
            placeholderTextColor="#CED2F5"
            style={styles.inputStyle}
            onChangeText={text => setexpiryM(text)}
            maxLength={2}
            keyboardType="number-pad"
          />
        </View>
        <View style={[styles.inputContainer, {marginVertical: 8}]}>
          <TextInput
            placeholder={t('Expiry Year')}
            placeholderTextColor="#CED2F5"
            style={styles.inputStyle}
            onChangeText={text => setexpiryY(text)}
            maxLength={4}
            keyboardType="number-pad"
          />
        </View>
        <View style={[styles.inputContainer, {marginVertical: 8}]}>
          <TextInput
            placeholder={t('CVC')}
            placeholderTextColor="#CED2F5"
            style={styles.inputStyle}
            onChangeText={text => setcvc(text)}
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          // onPress={() => {
          //   navigateToOrderVailidated();
          // }}
          // propsFun={handleConfirmation}
          onPress={handleConfirmation} // stripe Payment Button
          // onPress={APICall}
        >
          <Text style={styles.btnText}>{t('Confirm card details')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            {marginTop: 10, backgroundColor: disable ? 'grey' : '#3292E0'},
          ]}
          disabled={disable ? true : false}
          onPress={handlePaymnetIntent} // stripe Payment Button
          // onPress={APICall}
        >
          <Text style={styles.btnText}>{t('Proceed Payment')}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        // onPress={() => {
        //   navigateToOrderVailidated();
        // }}
        // propsFun={handleConfirmation}
       onPress={handleConfirmation} // stripe Payment Button
        
        >
        <Text>{t('Continuer')}</Text>
      </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

//make this component available to the app
export default PaymentDetails;
