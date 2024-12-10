import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import commonStyle from '../../helper/commonStyle';
import {useTranslation} from 'react-i18next';
import Curvedheader from '../../Components/Curvedheader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import firestore from '@react-native-firebase/firestore';
import AwesomeLoading from 'react-native-awesome-loading';
function Discount() {
  const {t, i18n} = useTranslation();
  const [List, setList] = useState([{id: 1}, {id: 2}, {id: 3}]);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    async function fetchValue() {
      try {
        let array = null;
        const subscriber = firestore()
          .collection('Discount')
          .onSnapshot(documentSnapshot => {
            setList(documentSnapshot.docs.map(d => d.data()));
            setvisible(true);
            console.log(
              'documentSnapshot.docs.map(d => d.data());',
              documentSnapshot.docs.map(d => d.data()),
            );
          });
      } catch (error) {
        console.log('Error is ', error);
      }
    }
    fetchValue();
  }, []);

  const FlatListView = ({item, index}) => {
    return (
      <View style={styles.MainContainer}>
        <View style={{width: '65%', marginTop: 15}}>
          <Text style={styles.MainContainerText}>{t('Remise')}</Text>
          <Text style={[styles.MainContainerText, {color: '#3292E0'}]}>
            {item.Discount.DiscountPercent}%
          </Text>
          <View style={{marginTop: 10}}>
            <Text style={styles.MainContainerText}>
              {t('Valable jusqu’au')}
            </Text>
            <Text style={styles.MainContainerText}>3 days</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ButtonStyle}>
          <Text style={styles.ButtonStyleText}>{item.Discount.Code}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {visible === false ? (
        <AwesomeLoading
          indicatorId={8}
          size={40}
          isActive={true}
          text="Please wait"
        />
      ) : (
        <View>
          <Curvedheader />
          <View style={styles.headerTextcontainer}>
            <Text style={styles.heheText}>{t('Remise')}s</Text>
          </View>
          <FlatList
            data={List}
            renderItem={FlatListView}
            keyExtractor={item => item.id}
            scrollEnabled
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: windowHeight * 1.0,
  },
  MainContainer: {
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 5,
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 9,
  },
  ButtonStyle: {
    width: windowWidth * 0.2,
    height: 46,
    backgroundColor: '#DFE7F5',
    justifyContent: 'center',
    marginTop: 25,
    borderRadius: 5,
  },
  MainContainerText: {
    width: '80%',
    marginLeft: '13%',
    fontSize: 11,
    fontFamily: commonStyle.regular,
    color: '#000',
    // backgroundColor: 'tomato',
  },
  ButtonStyleText: {
    textAlign: 'center',
    color: '#042C5C',
    fontSize: 13,
    fontFamily: commonStyle.Bold,
  },
  headerTextcontainer: {
    // backgroundColor: 'red',
    width: windowWidth * 0.6,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  heheText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    fontFamily: commonStyle.regular,
    fontSize: 16,
  },
});
export default Discount;
