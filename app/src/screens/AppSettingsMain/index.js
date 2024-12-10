//import liraries
import React, {Component,useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import RightArrow from 'react-native-vector-icons/EvilIcons';
import Logout from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Navigationstrings from '../../../Navigation/Navigationstrings';

// create a component
const AppSettingsMain = props => {
  const {t, i18n} = useTranslation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authStatusChecker');
      console.log("remove");
  }
  catch(exception) {
    console.log("Not Remove");
  }
    auth()
      .signOut()
      .then(() =>
        Toast.show({
          type: 'success',
          text1: t('Se déconnecter'),
          text2: t("L'utilisateur a été déconnecté !"),
        }),
      )
      .catch(() =>
        Toast.show({
          type: 'error',
          text1: t('Échec de la déconnexion'),
          text2: t("L'utilisateur ne peut pas se déconnecter !"),
        }),
      );
    // props.navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: Navigationstrings.Login,
    //       // params: {someParam: 'Param1'},
    //     },
    //   ],
    // });
    props.navigation.navigate(Navigationstrings.Login)
  };
  const navigateOrderDetailsScreen = () => {
    props.navigation.navigate(Navigationstrings.OrderDetails);
  };
  const navigateAddressScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.Address);
  };
  const navigateProfileScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.Profile);
  };
  const navigateDiscountScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.Discount);
  };
  const navigateServiceClientContactScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.ServiceClientContact);
  };
  const navigateCreditCardsScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.CreditCard);
  };
  const navigateLanguageScreen = () => {
    // console.log('done');
    props.navigation.navigate(Navigationstrings.Language);
  };
  const navigateToLegalNotice = () => {
    props.navigation.navigate(Navigationstrings.LegalNotice);
  };
  const navigateToTermsAndConditions = () => {
    props.navigation.navigate(Navigationstrings.TermsAndConditions);
  };
  const [LocalStogae,setLocalStogae] = useState(null)
  useEffect(() => {
    async function fetchValue() {
      try {
        // currentUser = await AsyncStorage.setItem('@currentUser', user.uid);
        const authStatus = await AsyncStorage.getItem('authStatusChecker');
        setLocalStogae(authStatus)
        console.log('Your authStatus in local storage is : ', authStatus);
        // console.log('Your currentUser in local storage is : ', currentUser);
        // const lan = await AsyncStorage.getItem('lan');
        // console.log('Your lan in local storage is : ', lan);
        // if (lan === null) {
        //   i18n.changeLanguage('fr');
        // } else {
        //   i18n.changeLanguage(lan);
        // }
      } catch (error) {
        console.log('Error is ', error);
      }
    }
    fetchValue();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      <Curvedheader />
      {
        LocalStogae=== null?
        <View style={{justifyContent:'center',alignItems: 'center',marginTop:40}}>
          <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateLanguageScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Langue')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonContainer} onPress={()=>props.navigation.navigate(Navigationstrings.Login)}>
        <Text style={styles.ButtonText}>{t('Valider')}</Text>
        </TouchableOpacity>
        
      </View>
        :
        <View>
          <View style={styles.AllSettingContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateOrderDetailsScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Commandes')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateAddressScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Adresses')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateProfileScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Profil')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateDiscountScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Remise')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateServiceClientContactScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Contacter')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateCreditCardsScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>
            {t('Cartes bancaires')}
          </Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingItemContainer}
          onPress={() => {
            navigateLanguageScreen();
          }}>
          <Text style={styles.settingItemTextContainer}>{t('Langue')}</Text>
          <View style={styles.iconContainer}>
            <RightArrow color={'#DDDDDD'} size={25} name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigateToTermsAndConditions();
          }}
          style={styles.termsCondTextContainer}>
          <Text style={styles.termsCondText}>{t('Conditions générales')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigateToLegalNotice();
          }}
          style={styles.termsCondTextContainer}>
          <Text style={styles.termsCondText}>{t('Mentions légales')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={logout}
        style={[styles.LogoutContainer, {backgroundColor: '#DFE7F5'}]}>
        <Text style={styles.settingItemTextContainer}>{t('Déconnexion')}</Text>
        <View style={styles.iconContainer}>
          <Logout color={'#888'} size={25} name="logout" />
        </View>
      </TouchableOpacity>
        </View>
      }
      {/*  */}
    </ScrollView>
  );
};

//make this component available to the app
export default AppSettingsMain;
