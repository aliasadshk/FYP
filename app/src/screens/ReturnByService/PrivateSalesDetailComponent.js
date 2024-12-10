//import liraries
import React, {Component, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  SafeAreaView,
  FlatList
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import commonStyle from '../../helper/commonStyle';
import banner from '../../Images/banner.jpg';
import banner2 from '../../Images/banner2.jpg';
import {useTranslation} from 'react-i18next';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// create a component
const PrivateSalesDetailComponent = () => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [DropID,setDropID] = useState('')
  const [Option,setOption] = useState([{id:1},{id:2},{id:3},{id:4}]);
  const images = [
    require('../../Images/iphone.png'),
    require('../../Images/iphone.png'),
    require('../../Images/iphone.png'),
  ];
  const [active, setActive] = useState(0);
  let [counter, setCounter] = useState(0);
  const makeincCount = () => {
    setCounter((counter = counter + 1));
  };

  const makedecCount = () => {
    counter == 0 ? setCounter(0) : setCounter(counter - 1);
  };
  const Change = nativeEvent => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const arrayOFF = Array.from(Array(100).keys());
  const sweeterArray = arrayOFF.map(arrayOFF => {
    return {label: arrayOFF, value: arrayOFF};
  });

  const arrayOFF1 = Array.from(Array(10).keys());
  const sweeterArray1 = arrayOFF1.map(arrayOFF => {
    return {label: arrayOFF, value: arrayOFF};
  });
  const ButtonIdSetFun = (id) => {
    console.log(id)
    if(DropID===''){
      setDropID(id)
    }
    else{
      setDropID('')
    }
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.bannerContainer}>
      <FlatList
            data={Option}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <View>
              <ImageBackground
          source={banner2}
          style={styles.backgroundImageStyle}
          resizeMode={'cover'}>
          <TouchableOpacity style={styles.addButtonContainer} onPress={()=>ButtonIdSetFun(item.id)}>
          {
            DropID===item.id?
            <Text style={styles.addButtonText}>-</Text>
            :
            <Text style={styles.addButtonText}>+</Text>
            
          }  
          </TouchableOpacity>
        </ImageBackground>
        {
          DropID===item.id?
          <View style={styles.DetailsContainer}>
          <View style={styles.upperRow}>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailNameText}>
                {t('Format 6 bouteilles')} 75cl
              </Text>
              <Text style={styles.discountPriceText}>5,00€/{t('carton')}</Text>
              <Text style={styles.priceText}>5,00€/{t('carton')}</Text>
            </View>
            <View style={styles.coounterContainer}>
              {/* <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => {
                      makedecCount();
                    }}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.counterTExt}>{counter}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => {
                      makeincCount();
                    }}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.downRow}>
            <View style={styles.dropDowncontainer}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={({nativeEvent}) => Change(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                style={styles.imageSwiper}>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={require('../../Images/iphone.png')}
                    style={{
                      width: windowWidth * 0.4,
                      height: windowHeight * 0.25,
                      borderRadius: 10,
                    }}
                    resizeMode={'contain'}
                  />
                ))}
              </ScrollView>
              <View style={styles.dotStyle}>
                {images.map((i, k) => (
                  <Text
                    key={k}
                    style={
                      k == active ? styles.pagingActiveText : styles.pagingText
                    }>
                    ⬤
                  </Text>
                ))}
              </View>
              <TouchableOpacity style={styles.buttonCartContainers}>
                <Text style={styles.buttonText}>{t('Ajouter au panier')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dropDownscontainer}>
              <View style={styles.inputContainer}>
                {/* <TextInput
                  placeholder={t('Taille')}
                  keyboardType="ascii-capable"
                  placeholderTextColor={'#14213D'}
                  style={styles.inputStyle}
                /> */}
                <Dropdown
                  style={[styles.dropdown, isFocus1 && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  autoScroll
                  // disable
                  // inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={styles.containerStyle}
                  data={sweeterArray1}
                  // search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus1 ? t('Taille') : '...'}
                  searchPlaceholder="Search..."
                  value={value1}
                  showsVerticalScrollIndicator={false}
                  onFocus={() => setIsFocus1(true)}
                  onBlur={() => setIsFocus1(false)}
                  onChange={item => {
                    setValue1(item.value);
                    setIsFocus1(false);
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
                  data={sweeterArray}
                  // search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? t('Quantité') : '...'}
                  searchPlaceholder="Search..."
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
              <View style={styles.descrContainer}>
                <Text style={styles.descrText}>Description Admin</Text>
                <Text style={styles.descrText}>Description Admin</Text>
                <Text style={styles.descrText}>Description Admin</Text>
                <Text style={styles.descrText}>Description Admin</Text>
                <Text style={styles.descrText}>Description Admin</Text>
                <Text style={styles.descrText}>Description Admin</Text>
              </View>
            </View>
          </View>
        </View>
        :
        <View/>
        }
        
        </View>
            )}/>
        
      </View>
      
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  bannerContainer: {
    //     backgroundColor: 'tomato',
    height: 'auto',
    width: windowWidth * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.03,
  },
  safeContainerStyle: {
    justifyContent: 'center',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    // borderRadius:0
  },
  backgroundImageStyle: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.95,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop:15
  },
  addButtonContainer: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    elevation: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#888',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  DetailsContainer: {
    backgroundColor: '#F4F6F8',
    width: windowWidth * 0.95,
    height: windowHeight * 0.5,
    marginTop: windowHeight * 0.03,
    borderRadius: 28,
    marginBottom: windowHeight * 0.04,
    elevation: 1,
  },
  upperRow: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    height: windowHeight * 0.1,
    width: windowWidth * 0.95,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: windowHeight * 0.03,
  },
  detailTextContainer: {
    // backgroundColor: 'tomato',
    height: windowHeight * 0.08,
    width: windowWidth * 0.8,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  detailNameText: {
    color: '#000',
    fontFamily: commonStyle.regular,
    fontSize: 14,
    // backgroundColor: 'tomato',
    margin: 2,
    width: windowWidth * 0.6,
  },
  discountPriceText: {
    color: '#000',
    fontFamily: commonStyle.regular,
    fontSize: 13,
    // backgroundColor: 'tomato',
    margin: 2,
  },
  priceText: {
    color: '#000',
    fontFamily: commonStyle.regular,
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  // coounterContainer: {
  //   flexDirection: 'row',
  //   height: windowHeight * 0.1,
  //   width: windowWidth * 0.3,
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  // },
  counterTExt: {
    fontSize: 30,
    color: '#000',
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#DFE8F2',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#A1B0C1',
    fontSize: 20,
  },
  downRow: {
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    alignSelf: 'center',
  },
  dropDowncontainer: {
    // backgroundColor: 'gold',
    width: windowWidth * 0.4,
    height: windowHeight * 0.31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSwiper: {
    // backgroundColor: 'gold',
    width: windowWidth * 0.4,
    height: windowHeight * 0.25,
    borderRadius: 10,
  },
  dotStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.1,
  },
  pagingText: {
    color: '#888',
    fontSize: 16,
    opacity: 0.1,
  },
  pagingActiveText: {
    color: '#14213D',
    fontSize: 16,
  },
  dropDownscontainer: {
    // backgroundColor: 'green',
    width: windowWidth * 0.4,
    height: windowHeight * 0.31,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputContainer: {
    backgroundColor: '#d5d6d7',
    width: windowWidth * 0.4,
    height: 50,
    borderRadius: 10,
    elevation: 1,
  },
  inputStyle: {
    padding: 10,
    color: '#14213D',
    fontFamily: commonStyle.regular,
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainers: {
    backgroundColor: '#1A6CAF',
    height: windowHeight * 0.04,
    width: windowWidth * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonCartContainers: {
    backgroundColor: '#3292E0',
    height: windowHeight * 0.04,
    width: windowWidth * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: commonStyle.regular,
  },
  descrContainer: {
    //     backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    textAlign: 'justify',
  },
  descrText: {
    color: '#BCB8B1',
    fontSize: 12,
    fontFamily: commonStyle.regular,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 17,
    backgroundColor: '#d5d6d7',
    elevation: 1,
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
  containerStyle: {
    backgroundColor: '#d5d6d7',
    borderRadius: 8,
    maxHeight: 100,
  },
});

//make this component available to the app
export default PrivateSalesDetailComponent;
