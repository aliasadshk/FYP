import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import Home from 'react-native-vector-icons/Ionicons';
function Restaurant() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.HeadingText}>Livraison en cours</Text>
        <Text style={styles.SubHeadingText}>Adresse restaurant</Text>
      </View>
      <View style={styles.LineStyle} />
      <View style={styles.AddressContainer}>
        <Text style={styles.AddressContainerText}>
          12 Boulevard Malesherbes, 75008 Paris
        </Text>
        <View style={[styles.LineStyle, {width: '76%'}]} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 25,
            marginLeft: '2%',
            marginBottom: 10,
          }}>
          <TouchableOpacity style={styles.LeftButton}>
            <Text style={styles.LeftButtonText}>Ouvrir dans Waze</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LeftButton}>
            <Text style={styles.LeftButtonText}>Ouvrir dans Waze</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.LineStyle, {width: '76%'}]} />
        <Text style={styles.AddressContainerText}>
          12 Boulevard Malesherbes, 75008 Paris
        </Text>
      </View>
      <TouchableOpacity style={styles.ButtonStyle}>
        <Text style={styles.ButtonStyleText}>Scanner QR code</Text>
      </TouchableOpacity>
      <View style={styles.HomeContainer}>
        <Home
          color={'#fff'}
          name="home"
          size={35}
          style={{alignSelf: 'center'}}
        />
      </View>
    </View>
  );
}
export default Restaurant;
