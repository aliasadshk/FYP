//import liraries
import React, {Component, useState, useEffect} from 'react';

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
  SafeAreaView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import commonStyle from '../../helper/commonStyle';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import firestore from '@react-native-firebase/firestore';
import AwesomeLoading from 'react-native-awesome-loading';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase/app';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {filterConfig} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
// create a component
const ByPlaneDetailsComponent = props => {
  const {t, i18n} = useTranslation();
  const [StateValue, setStateValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [QuantityValue, setQuantityValue] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [productName, setProductName] = useState('Wardrobe boxes');
  const [ByShippingType, setByShippingType] = useState('Plane');
  const [productValue, setProductValue] = useState(0);
  const [localStorage, setLocalStorage] = useState([]);
  const [images, setImages] = useState([props.ArrayData.image]);
  const data = [
    {label: t('Neuf'), value: 'New'},
    {label: t('Occasion'), value: 'Used'},
  ];

  const [active, setActive] = useState(0);

  const Change = nativeEvent => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const arrayOFF = Array.from(Array(props.ArrayData.quantity).keys());
  const sweeterArray = arrayOFF.map(arrayOFF => {
    return {label: arrayOFF, value: arrayOFF};
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectImageFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      images.map(item => {
        setImages(pre => [...pre, item.path]);
      });
    });
  };

  const openCameraForPicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  const handleCartLogin = async () => {
    try {
      const authStatus = await AsyncStorage.getItem('authStatusChecker');
      console.log('Your authStatus in local storage is : ', authStatus);

      // Not Login
      if (authStatus === null) {
        props.Rout.navigation.navigate(Navigationstrings.Login);
      } else {
        handleCart();
      }
    } catch (e) {
      console.log('Error');
    }
  };
  const handleCart = async () => {
    // console.log("Data from array is ",props.ArrayData)
    let ProductPrice = props.ArrayData.Price;
    let ProductPriceNew = props.ArrayData.newprice;
    // console.log('productValue', productValue);
    // console.log('QuantityValue', QuantityValue);
    // console.log('StateValue', StateValue);
    // console.log('productName', props.ArrayData.name);
    // console.log('CountryName', props.Data.country);
    // console.log('methord', props.Data.way);
    // console.log('props.ArrayData.newPrice', ProductPriceNew);
    // console.log('props.ArrayData.Price', ProductPrice);
    let Array = [];
    let match = false;
    const obj = [
      {
        productName: props.ArrayData.name,
        stateValue: StateValue,
        QuantityValue: QuantityValue,
        productValue: productValue,
        shipCountry: props.Data.country,
        shipMeth: props.Data.way,
        Price: ProductPrice,
        newPrice: ProductPriceNew,
        Category: props.ArrayData.category,
        ID: (Math.random() + 1).toString(36).substring(7),
      },
    ];

    const basketArray = AsyncStorage.getItem('basketArray').then(req => {
      // setLocalStorage(()=>req)
      console.log('JSON.parse(req)', JSON.parse(req));

      if (JSON.parse(req) === null) {
        console.log('if');
        AsyncStorage.setItem('basketArray', JSON.stringify(obj));
        Toast.show({
          type: 'success',
          text1: t('Succès'),
          text2: t('Ajouter au panier avec succès'),
        });
        props.NavRout.navigate('Cart', {screen: 'WeightCal'});
      } else {
        Array = JSON.parse(req);
        Array.push(obj[0]);
        console.log('Array is ready o push', Array);
        // Array=localStorage.filter((item)=>{
        //   return item.productName!==props.ArrayData.name
        // })
        console.log('Else Statement');
        //         console.log("else if")
        JSON.parse(req).map(ls => {
          if (ls.productName === props.ArrayData.name) {
            match = true;
          }
          console.log('ls', ls);
          console.log('props.ArrayData.name', props.ArrayData.name);
          console.log('ls.productName', ls.productName);
        });
        if (match === true) {
          console.log('if part of else');
          Toast.show({
            type: 'error',
            text1: t('Il y a un problème !'),
            text2: t('Ce produit a déjà été ajouté'),
          });
        } else {
          AsyncStorage.setItem('basketArray', JSON.stringify(Array));
          Toast.show({
            type: 'success',
            text1: t('Succès'),
            text2: t('Ajouter au panier avec succès'),
          });
          props.NavRout.navigate('Cart', {screen: 'WeightCal'});
        }
        // }
        //       else {
        //         console.log("Else part : ")
        //          AsyncStorage.setItem(
        //     'basketArray',
        //     JSON.stringify(obj)
        //   );
      }
    });
    // console.log("Array",Array)
    // const UpdatebasketArray = await AsyncStorage.setItem(
    //   'basketArray',
    //   JSON.stringify(obj)
    // );
    // const basketArray1 = await AsyncStorage.getItem('basketArray').then(req => {
    //   console.log('JSON.parse(req) 222222222', JSON.parse(req));
    // });
  };
  //   const handleCart = async () => {
  //     let ProductPrice = props.ArrayData.Price;
  //     let ProductPriceNew = props.ArrayData.newPrice;
  //     console.log('productValue', productValue);
  //     console.log('QuantityValue', QuantityValue);
  //     console.log('StateValue', StateValue);
  //     console.log('productName', productName);
  //     console.log('CountryName', props.Data.country);
  //     console.log('methord', props.Data.way);
  //     console.log('props.ArrayData.newPrice', ProductPriceNew);
  //     console.log('props.ArrayData.Price', ProductPrice);

  //     console.log(
  //       'Math.floor(Math.random() * 4)',
  //       Math.floor(Math.random() * 11),
  //     );
  //     var numberTwo = Math.floor(Math.random() * 4);

  //     // Get Data

  //     let Array = [];
  //     try {
  //       const basketArray = await AsyncStorage.getItem('basketArray').then(
  //         req => {
  //           console.log('JSON.parse(req)', JSON.parse(req));
  // if (JSON.parse(req) === null) {
  //             Array = [
  //               {
  //                 productName: productName,
  //                 stateValue: StateValue,
  //                 QuantityValue: QuantityValue,
  //                 productValue: productValue,
  //                 shipCountry: props.Data.country,
  //                 shipMeth: props.Data.way,
  //                 Price: ProductPrice,
  //                 newPrice: ProductPriceNew,
  //               },
  //             ];
  //             // Toast.show({
  //             //   type: 'success',
  //             //   text1: t('Succès'),
  //             //   text2: t('Ajouter au panier avec succès'),
  //             // });
  //             // props.NavRout.push('Cart', { screen: 'WeightCal' })
  //             console.log("Array",Array)
  //           } else {
  //             JSON.parse(req).map(ls=>{
  //               if(ls.productName===productName){
  //                 alert("Product Already Added")
  //               }
  //               else{
  //                 Array = JSON.parse(req);
  //             const obj = {
  //               productName: productName,
  //               description: StateValue,
  //               QuantityValue: QuantityValue,
  //               productValue: productValue,
  //               shipCountry: props.Data.country,
  //               shipMeth: props.Data.way,
  //               Price: ProductPrice,
  //               newPrice: ProductPriceNew,
  //             };
  //             console.log("objobjobj",obj)
  //             console.log("Array",Array)
  //             Array.push(obj);
  //             // Toast.show({
  //             //   type: 'success',
  //             //   text1: t('Succès'),
  //             //   text2: t('Ajouter au panier avec succès'),
  //             // });
  //             console.log('Array before Pushing Array', Array);
  //             // props.NavRout.push('Cart', { screen: 'WeightCal' })
  //               }
  //             })

  //           }

  //         },
  //         console.log("basketArray after Render",basketArray)
  //       );
  //     } catch (error) {
  //       console.log('Error is ', error);
  //       Toast.show({
  //         type: 'error',
  //         text1: t('Mauvais mot de passe'),
  //         text2: t('Il y a un problème !'),
  //       });
  //     }

  //     try {
  //       const authStatus = await AsyncStorage.getItem('authStatusChecker');
  //       console.log('Your authStatus in local storage is : ', authStatus);

  //       // Not Login
  //       if (authStatus === null) {
  //         props.Rout.navigation.navigate(Navigationstrings.Login);
  //       } else {
  //         console.log("Array before Push",Array)
  //         const basketArray = await AsyncStorage.setItem(
  //           'basketArray',
  //           JSON.stringify(Array),
  //         );
  //         console.log('Basket Array Save', basketArray);
  //         Toast.show({
  //               type: 'success',
  //               text1: t('Succès'),
  //               text2: t('Ajouter au panier avec succès'),
  //             });
  //       }
  //     } catch (error) {
  //       console.log('Error is ', error);
  //     }
  //     try {
  //     } catch (error) {
  //       console.log('basketArray Error', error);
  //     }

  //     // try {
  //     //   firestore()
  //     //     .collection('cart')
  //     //     .add({
  //     //       ByShippingType: ByShippingType,
  //     //       ProductName: productName,
  //     //       Quantity: QuantityValue,
  //     //       State: StateValue,
  //     //       Value: productValue,
  //     //     })
  //     //     .then(() => {
  //     //       console.log('Cart Added ');
  //     //     });
  //     // } catch (error) {
  //     //   console.log(`Error: ${error}`);
  //     // }
  //   };

  return (
    <View style={styles.DetailsContainer}>
      <TouchableOpacity></TouchableOpacity>
      <View style={styles.upperRow}>
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailNameText}>
            {/* {t('Format 6 bouteilles')} 75cl */}
            {props.ArrayData.name}
          </Text>
          {/* <View style={[styles.inputContainer,{height:40}]}>
            <TextInput
              placeholder={t('Nam')}
              keyboardType="ascii-capable"
              placeholderTextColor={'#14213D'}
              style={[styles.inputStyle,{marginLeft:3}]}
              value={productValue}
              onChangeText={text => {
                setProductName(text);
              }}
            />
          </View> */}
          <View>
            <Text style={styles.discountPriceText}>
              {props.ArrayData.newprice}€/{t('carton')}
            </Text>
            <Text style={styles.priceText}>
              {props.ArrayData.Price}€/{t('carton')}
            </Text>
          </View>
        </View>
        <View style={styles.coounterContainer}></View>
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
                source={{uri: image}}
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
          <TouchableOpacity
            style={styles.buttonCartContainers}
            onPress={() => {
              handleCartLogin();
            }}>
            <Text style={styles.buttonText}>{t('Ajouter au panier')}</Text>
            {/* <Text style={styles.buttonText}>{t('Ajouter au panier')}</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.dropDownscontainer}>
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
              placeholder={!isFocus ? t('Etat') : '...'}
              searchPlaceholder="Search..."
              value={StateValue}
              showsVerticalScrollIndicator={false}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setStateValue(item.value);
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
          <View style={styles.safeContainerStyle}>
            <Dropdown
              style={[styles.dropdown, isFocus]}
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
              placeholder={!isFocus1 ? t('Quantité') : '...'}
              searchPlaceholder="Search..."
              value={QuantityValue}
              showsVerticalScrollIndicator={false}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setQuantityValue(item.value);
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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={t('Valeur')}
              keyboardType="ascii-capable"
              placeholderTextColor={'#14213D'}
              style={styles.inputStyle}
              value={productValue}
              onChangeText={text => {
                setProductValue(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonUploadContainers}
            onPress={toggleModal}>
            <Text style={styles.buttonText}>{t('Sélectionner une image')}</Text>
            {
              <View>
                <Modal
                  isVisible={isModalVisible}
                  backdropOpacity={0.4}
                  animationIn={'fadeInUp'}
                  animationInTiming={600}
                  animationOut={'fadeOutDown'}
                  animationOutTiming={600}
                  useNativeDriver={true}>
                  <View style={styles.ModalContainer}>
                    <View style={styles.uploadContainer}>
                      <Text style={styles.uploadText}>
                        {t('Télécharger une photo')}
                      </Text>
                      <Text style={styles.uploadSubText}>
                        {t('Choisissez une image')}
                      </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.cameraGallerybuttons}
                        onPress={() => {
                          selectImageFromGallery();
                        }}>
                        <Text style={styles.buttonText}>
                          {t('Choisir une image dans la galerie')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cameraGallerybuttons}
                        onPress={() => {
                          openCameraForPicture();
                        }}>
                        <Text style={styles.buttonText}>
                          {t('Ouvrir la caméra')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={toggleModal}>
                        <Text style={styles.buttonText}>{t('Annuler')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            }
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.bottomTextContainer}>
        <TextInput
          placeholder={t('Informations complémentaires')}
          placeholderTextColor={'#BCB8B1'}
          multiline={true}
          style={styles.commentInput}
        />
      </View> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  DetailsContainer: {
    backgroundColor: '#F4F6F8',
    width: windowWidth * 0.95,
    height: windowHeight * 0.5,
    marginTop: windowHeight * 0.03,
    borderRadius: 28,
    elevation: 1,
  },
  safeContainerStyle: {
    justifyContent: 'center',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    // borderRadius:0
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
    flexDirection: 'row',
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
    marginLeft: '10%',
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
    // backgroundColor: 'tomato',
    margin: 2,
  },

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
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
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
    bottom: windowHeight * 0.06,
    alignSelf: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.1,
    color: 'dodgeblue',
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
    height: windowHeight * 0.33,
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
    color: '#000',
    fontFamily: commonStyle.regular,
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainers: {
    backgroundColor: '#3292E0',
    height: windowHeight * 0.04,
    width: windowWidth * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonUploadContainers: {
    backgroundColor: '#1A6CAF',
    height: windowHeight * 0.04,
    width: windowWidth * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    // marginTop:10
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
    fontSize: 11,
    color: '#fff',
    fontFamily: commonStyle.regular,
    // backgroundColor: 'tomato',
    width: windowWidth * 0.4,
    textAlign: 'center',
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
  ModalContainer: {
    width: windowWidth * 1.0,
    height: windowHeight * 0.4,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 0,
    position: 'absolute',
  },
  cameraGallerybuttons: {
    backgroundColor: '#1A6CAF',
    height: 50,
    width: windowWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#ff726f',
    height: 50,
    width: windowWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  uploadContainer: {
    // backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: windowWidth * 0.8,
    height: 40,
    alignSelf: 'center',
  },
  uploadText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontFamily: commonStyle.Bold,
  },
  uploadSubText: {
    color: '#cccccc',
    textAlign: 'center',
    fontFamily: commonStyle.regular,
  },
  buttonsContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomTextContainer: {
    // backgroundColor: 'gold',
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    alignSelf: 'center',
  },
  bottomText: {
    fontFamily: commonStyle.regular,
    color: '#BCB8B1',
    fontSize: 14,
    margin: 10,
  },
  commentInput: {
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    width: windowWidth * 0.85,
    height: windowHeight * 0.1,
    textAlignVertical: 'top',
    color: '#000',
    fontFamily: commonStyle.regular,
  },
});

//make this component available to the app
export default ByPlaneDetailsComponent;
