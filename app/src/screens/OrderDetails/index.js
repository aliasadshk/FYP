//import liraries
import {t} from 'i18next';
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import TypeIcon from 'react-native-vector-icons/Ionicons';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import firebase from '@react-native-firebase/app';
import Navigationstrings from '../../../Navigation/Navigationstrings';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Payée',
    ShippedFrom: 'boat-outline',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'A Payée',
    ShippedFrom: 'airplane',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Payée',
    ShippedFrom: 'boat-outline',
  },
];






// create a component
const OrderDetails = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    let emailAddress = 'abc@gmail.com'
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User email: ', user.email);
        emailAddress = user.email
      }
    })
    const subscriber = firestore().collection('Orders').where("Email","==",emailAddress).get().then(res=>{
      res.forEach(item=>{
        console.log(item.data())
        setData((prevData)=>[...prevData,item.data()])
      })
    })
  
  }, [])
  const {t, i18n} = useTranslation();
  const Item = ({item}) => (
    <View style={styles.orderDetailsContainer}>
      <View style={styles.AllTextContainer}>
        <View>
          <TypeIcon name={item.ShipmentMethod==="avion"?"airplane":"boat-outline"} color={'#000'} size={18} />
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.NameTxt}>
            {t('Product')}: {t(item.ProductName)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Category')}: {t(item.Category)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Subcategory')}: {t(item.ShipmentMethod)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Picture')}: {t(item.ShipmentMethod)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Information')}: {t(item.ShipmentMethod)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Price')}: ${t(item.Price)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Value')}: {t(item.ShipmentMethod)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Quantity')}: {t(item.ShipmentMethod)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Value')}: {t(item.ProductStatus)}
          </Text>
          
          <Text style={styles.NameTxt}>
            {t('Country of expedition')}: {t(item.ShipCountry)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Address')}: {t(item.Address)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Delivery')}: {t(item.DeliveryType)}
          </Text>
          <Text style={styles.NameTxt}>
            {t('Slot')}: {t(item.Date)}
          </Text>
          
          {/* <Text style={styles.NameTxt}>{t("Montant")} {item.Price}€</Text>
          <Text style={styles.PriceAndDateText}>
            {t('Effectuée le')} {item.Date}
          </Text> */}
        </View>
        <View
          style={[
            styles.boxContainer,
            item.Status == 'Paid'
              ? {backgroundColor: '#e0e7f5'}:
              {backgroundColor: '#feafc9'},
          ]}>
           <Text
            style={[
              styles.boxText,
              item.Status == 'Paid' ? {color: '#2f4b6e'} : {color: '#fff'},
            ]}>
            {t(item.Status)}
          </Text> 
        </View>
      </View>
      {/*  */}
      <TouchableOpacity style={styles.orderAgainContainer} onPress={()=>props.navigation.navigate(Navigationstrings.WeightCal)}>
        <Text style={styles.TExtstyle}>{t('Commander à nouveau')}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => (
    <Item item={item}  />
  );

  return (
    <View style={styles.container}>
      <Curvedheader />
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerFlatelist}
      />
    </View>
  );
};

//make this component available to the app
export default OrderDetails;
