//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import {useTranslation} from 'react-i18next';

// create a component
const CountryDelivery = props => {
  const {t, i18n} = useTranslation();

  const [isFocus, setIsFocus] = useState(true);
  const [value, setValue] = useState(`🇨🇮 ${t("côte d'ivoire")}`);
  const data = [
    {label: '🇫🇷    France', value: 'France'},
    {label: `🇨🇮    ${t("Côte d'Ivoire")}`, value: 'Ivory Coast'},
  ];
  function handleSelection(e) {
    console.log(e);
  }
  const [dataprevios, setdataprevios] = useState('');
  useEffect(() => {
    
    const navVar = props.route.params.Value;
    setdataprevios(navVar);
    // setActivityIndicatorVar(false);
  }, []);
  console.log(dataprevios);
  const navigateToReturnByServiceScreen = id => {
    console.log("Send Value",id,value)
    props.navigation.navigate(Navigationstrings.ReturnByService, {
      Value: id,
        Country:value
    });
  };
  return (
    <View style={styles.container}>
      <Curvedheader />

      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>{t('Pays de livraison')}</Text>
      </View>

      <View style={styles.safeContainerStyle}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          autoScroll
          // disable
          // inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerStyle}
          data={data}
          // search
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder={
            !isFocus ? 'Select Country' : `🇨🇮    ${t("Côte d'Ivoire")}`
          }
          // searchPlaceholder="Search..."
          value={value}
          showsVerticalScrollIndicator={false}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigateToReturnByServiceScreen(dataprevios);
        }}
        style={{
          backgroundColor: '#3885DA',
          width: '80%',
          height: 50,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={styles.butnText}>{t('Valider')}</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles

//make this component available to the app
export default CountryDelivery;
