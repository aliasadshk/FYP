//import liraries
import React, {Component, useEffect, useState} from 'react';
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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import sd from '../../Images/LOGO_GS.png';
import widges from '../../Images/baseline_widgets_black_24dp.png';
import liquor from '../../Images/baseline_liquor_black_24dp.png';
import phonesetc from '../../Images/baseline_phone_iphone_black_24dp.png';
import Svg, {Path, G, Defs} from 'react-native-svg';
import styles from './styles';

import ByPlaneDetailsComponent from './ByPlaneDetailsComponent';
import BuyingDemandDetailComponent from './BuyingDemandDetailComponent';
import PrivateSalesDetailComponent from './PrivateSalesDetailComponent';
import ByBoatDetailsContainer from './ByBoatDetailsContainer';
import {useTranslation} from 'react-i18next';
import Other from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
// create a component
const ReturnByService = props => {
  const {t, i18n} = useTranslation();
  const [ActivityIndicatorVar, setActivityIndicatorVar] = useState(true);
  const [dataprevios, setdataprevios] = useState({});
  const [mobile, setMobile] = useState(false);
  const [drink, setDrink] = useState(false);
  const [products, setProducts] = useState('Ordinary non breakable product');
  const [otherCatagories, setOtherCatagories] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    console.log("this"
    )
    setdata([]);
    setActivityIndicatorVar(true);
    const navVar = props.route.params.Value;
    const Country = props.route.params.Country;
    setdataprevios({way: navVar, country: Country});
    setActivityIndicatorVar(false);
    async function fetchUserAPI() {
      firestore()
        .collection('ByPlan')
        .where('category', '==', products)
        .get()
        .then(res => {
          res.forEach(item => {
            setdata(pre => [...pre, item.data()]);
          });
        })
        .then(() => {
          setActivityIndicatorVar(false);
        });
    }
    fetchUserAPI();
    console.log('data is : ', data);
  }, [products]);
  const [showByPlane, setByPlane] = useState(false);
  const [showBoat, setshowBoat] = useState(false);
  const [showPrivateSales, setPrivateSales] = useState(false);
  const [showDemand, setshowDemand] = useState(false);
  const [active, setActive] = useState(0);

  const renderByPlaneItem = ({item}) => (
    <ByPlaneDetailsComponent
      Rout={props}
      Data={dataprevios}
      ArrayData={item}
      NavRout={props.navigation}
      productsSubCatagory={products}
    />
  );
  // const renderPrivateSalesItem = ({item}) => <PrivateSalesDetailComponent />;
  const renderDemandItem = ({item}) => <BuyingDemandDetailComponent />;
  const renderByBoatItem = ({item}) => <ByBoatDetailsContainer />;

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={424.846}
        height={123.184}
        {...props}>
        <Path
          data-name="Path 1"
          d="M424.846 109.193c-222.328 31.474-424.846 0-424.846 0V0h424.846Z"
          fill="#3885DA"
        />
        <View style={styles.INContainer}>
          <Image style={styles.imageStyler} source={sd} resizeMode="center" />
          <Text style={styles.mainTextStyle}>GS</Text>
        </View>
      </Svg>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            setByPlane(true);
            setPrivateSales(false);
            setshowDemand(false);
            setshowBoat(false);
            setdataprevios({});
          }}
          style={[
            styles.tabNameContainer,
            showByPlane == true || dataprevios.way === 'avion'
              ? {borderBottomWidth: 1}
              : {borderBottomWidth: 0},
          ]}>
          <Text style={styles.tabarTextStyle}>
            {t('Fret Par')} {t('avion')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setByPlane(false);
            setPrivateSales(false);
            setshowDemand(false);
            setshowBoat(true);
            setdataprevios({});
          }}
          style={[
            styles.tabNameContainer,
            showBoat == true || dataprevios.way === 'bateau'
              ? {borderBottomWidth: 1}
              : {borderBottomWidth: 0},
          ]}>
          <Text style={styles.tabarTextStyle}>
            {t('Fret Par')} {t('bateau')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setByPlane(false);
            setPrivateSales(true);
            setshowDemand(false);
            setshowBoat(false);
            setdataprevios({});
          }}
          style={[
            styles.tabNameContainer,
            showPrivateSales == true || dataprevios.way === 'private'
              ? {borderBottomWidth: 1}
              : {borderBottomWidth: 0},
          ]}>
          <Text style={styles.tabarTextStyle}>{t('Ventes privées')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setByPlane(false);
            setPrivateSales(false);
            setshowDemand(true);
            setshowBoat(false);
            setdataprevios({});
          }}
          style={[
            styles.tabNameContainer,
            showDemand == true || dataprevios.way === 'Demand'
              ? {borderBottomWidth: 1}
              : {borderBottomWidth: 0},
          ]}>
          <Text style={styles.tabarTextStyle}>{t("Demande d'achat")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subTabbarContainer}>
        <ScrollView
          scrollEnabled
          horizontal={true}
          contentContainerStyle={styles.subTabbarScrollContainer}>
          <TouchableOpacity
            style={[
              styles.imageTextContainer,
              products == 'Ordinary non breakable product'
                ? {backgroundColor: '#fff', elevation: 3, borderRadius: 5}
                : null,
            ]}
            activeOpacity={0.5}
            onPress={() => {
              setMobile(false);
              setDrink(false);
              setProducts('Ordinary non breakable product');
              setOtherCatagories(false);
            }}>
            <View>
              <Image
                style={styles.iconStyler}
                source={widges}
                resizeMode="center"
              />
            </View>
            <Text style={styles.subtabarTextStyle}>
              {t('Produits ordinaires non cassables')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.imageTextContainer,
              drink == true
                ? {backgroundColor: '#fff', elevation: 3, borderRadius: 5}
                : null,
            ]}
            activeOpacity={0.5}
            onPress={() => {
              setMobile(false);
              setDrink(true);
              setProducts('Drink are breakable product');
              setOtherCatagories(false);
            }}>
            <View>
              <Image
                style={styles.iconStyler}
                source={liquor}
                resizeMode="center"
              />
            </View>
            <Text style={styles.subtabarTextStyle}>
              {t('Boissons ou produits cassables')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.imageTextContainer,
              mobile == true
                ? {backgroundColor: '#fff', elevation: 3, borderRadius: 5}
                : null,
            ]}
            activeOpacity={0.5}
            onPress={() => {
              setMobile(true);
              setDrink(false);
              setProducts('Telephone and computer');
              setOtherCatagories(false);
            }}>
            <View>
              <Image
                style={styles.iconStyler}
                source={phonesetc}
                resizeMode="center"
              />
            </View>
            <Text style={styles.subtabarTextStyle}>
              {t('Téléphones et ordinateurs')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.imageTextContainer,
              otherCatagories == true
                ? {backgroundColor: '#fff', elevation: 3, borderRadius: 5}
                : null,
            ]}
            activeOpacity={0.5}
            onPress={() => {
              setMobile(false);
              setDrink(false);
              setProducts('Other product');
              setOtherCatagories(true);
            }}>
            <View>
              <Other name="recycle-variant" color={'#000'} size={15} />
            </View>
            <Text style={styles.subtabarTextStyle}>Other Catagories</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {ActivityIndicatorVar === true ? (
        <ActivityIndicator size={'large'} color={'#000'} />
      ) : (
        <>
          {/* {console.log(showPrivateSales)} */}
          {showByPlane === true || dataprevios.way === 'avion' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderByPlaneItem}
              keyExtractor={item => item.id}
            />
          ) : null}
          {showDemand === true || dataprevios.way === 'Demand' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderDemandItem}
              keyExtractor={item => item.id}
            />
          ) : null}
          {showPrivateSales === true || dataprevios.way === 'private' ? (
            <PrivateSalesDetailComponent />
          ) : null}
          {showBoat === true || dataprevios.way === 'bateau' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderByBoatItem}
              keyExtractor={item => item.id}
            />
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

//make this component available to the app
export default ReturnByService;
