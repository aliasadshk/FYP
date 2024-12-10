import React, {useState,useEffect} from 'react';
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
  ScrollView,
} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CalendarPicker from 'react-native-calendar-picker';
import Curvedheader from '../../Components/Curvedheader';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import {useTranslation} from 'react-i18next';
const minDate = new Date(); // Today
const maxDate = new Date(2035, 6, 3);
function PickupWindow(props) {
  const {t, i18n} = useTranslation();
  const [List, setList] = useState([{id: 1}, {id: 1}, {id: 1}]);
  const [selectedStartDate, setselectedStartDate] = useState(new Date());
  function onDateChange(date) {
    setselectedStartDate(date);
  }
  const navigateToOrderRegistered = () => {
    let date = JSON.stringify(selectedStartDate).split('T');
    props.route.params.basketarray.Date= date[0].split('"')[1];
    props.navigation.navigate(Navigationstrings.PaymentMethods,{basketarray:props.route.params.basketarray,otherInformation:props.route.params.otherInformation,TotalPrice:props.route.params.TotalPrice});
  };
  useEffect(() => {
    const navVar = props.route.params.basketarray;
    console.log("basketarraybasketarray",props.route.params.TotalPrice,navVar)
    console.log("otherInformationotherInformation",props.route.params.otherInformation)
  }, [0]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Curvedheader />
      <View style={{}} />
      <Text style={styles.HeadingText}>{t('Créneau d’enlèvement')}</Text>
      <View style={styles.CalenderContainer}>
        <CalendarPicker
          startFromMonday={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#3885DA"
          selectedDayColor="#3885DA"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
          // enableDateChange={true}
        />
      </View>

      {/* <View style={{flexDirection: 'row'}}>
        <View style={styles.MainContainer}>
          <Text style={styles.SelectText}>08:00 - 10-00</Text>
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.SelectText}>10:00 - 12-00</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.MainContainer}>
          <Text style={styles.SelectText}>14:00 - 16:00</Text>
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.SelectText}>16:00 - 18:00</Text>
        </View>
      </View> */}
      <View style={{marginTop: 20}} />
      <TouchableOpacity
        style={styles.ButtonStyle}
        onPress={() => {
          navigateToOrderRegistered();
        }}>
        <Text style={styles.ButtonStyleText}>{t('Valider')}</Text>
      </TouchableOpacity>
      <View style={{height:120}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  HeadingText: {
    fontSize: 18,
    fontFamily: commonStyle.regular,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  CalenderContainer: {
    width: '96%',
    alignSelf: 'center',
    borderWidth: 1.2,
    borderColor: 'lightgray',
    marginBottom: 20,
    borderRadius: 4,
  },
  MainContainer: {
    width: '47%',
    marginLeft: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 2,
    height: 38,
    backgroundColor: '#fff',
    marginBottom: 15,
    justifyContent: 'center',
    borderRadius: 4,
  },
  SelectText: {
    fontFamily: commonStyle.regular,
    fontSize: 12,
    marginLeft: '8%',
    color: '#000',
  },
  ButtonStyle: {
    width: windowWidth * 0.6,
    height: 44,
    alignSelf: 'center',
    backgroundColor: '#3885DA',
    justifyContent: 'center',
    marginTop: 25,
    borderRadius: 40,
    marginBottom: 30,
  },
  ButtonStyleText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontFamily: commonStyle.regular,
  },
});
export default PickupWindow;
