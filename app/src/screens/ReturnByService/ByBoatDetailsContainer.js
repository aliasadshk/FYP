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
  SafeAreaView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import commonStyle from '../../helper/commonStyle';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// create a component
const ByBoatDetailsContainer = () => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const data = [
    {label: 'Neuf', value: 'Neuf'},
    {label: 'Occasion', value: 'Occasion'},
  ];
  const images = [
    require('../../Images/iphone.png'),
    require('../../Images/iphone.png'),
    require('../../Images/iphone.png'),
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
  const arrayOFF = Array.from(Array(100).keys());
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
      console.log(images);
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

  return (
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
              placeholder={!isFocus1 ? t('Quantité') : '...'}
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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={t('Valeur')}
              keyboardType="ascii-capable"
              placeholderTextColor={'#14213D'}
              style={styles.inputStyle}
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
    fontSize: 10,
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
});

//make this component available to the app
export default ByBoatDetailsContainer;
