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
} from 'react-native';
import commonStyle from '../../helper/commonStyle';
import Curvedheader from '../../Components/Curvedheader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useTranslation} from 'react-i18next';

function Language(props) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [ChangeLanguage, setChangeLanguage] = useState(false);
  const {t, i18n} = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const data = [
    {
      label: 'Français',
      value: 'fr',
    },
    {
      label: 'English',
      value: 'en',
    },
  ];
  function handleSelection(e) {
    console.log(e);
  }
  const ChangeLanguageFun = () => {
    setChangeLanguage(!ChangeLanguage);
  };

  const changeLanguage = async value => {
    setCurrentLanguage(value);
    try {
      await AsyncStorage.setItem('lan', value);
    } catch (e) {
      console.log('Error is   :', e);
    }
    console.log(value);
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Curvedheader />
      <View style={styles.dropContainerStyle}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          autoScroll
          // disable
          // inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerrrrStyle}
          data={data}
          // search
          maxHeight={120}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Français' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          showsVerticalScrollIndicator={false}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            changeLanguage(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Text style={styles.ButtonText}>{t('Valider')}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    width: '40%',
    height: 45,
    borderRadius: 60,
    justifyContent: 'center',
    backgroundColor: '#3292E0',
    marginTop: windowHeight * 0.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  ButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  dropContainerStyle: {
    justifyContent: 'center',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.9,
    // borderRadius:0
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
  },

  dropdown: {
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 17,
    backgroundColor: '#fff',
    // elevation: 1,
    width: windowWidth * 0.8,
    borderWidth: 1,
    borderColor: '#DADAED',
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: commonStyle.regular,
    color: '#14213D',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: commonStyle.regular,
    color: '#14213D',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerrrrStyle: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 100,
    elevation: 10,
  },
});
export default Language;
