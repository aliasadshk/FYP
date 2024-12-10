//import liraries
import React, {Component, useState, useEffect,useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Curvedheader from '../../Components/Curvedheader';
import cartIcon from '../../Images/cart-shopping-fast.png';
import firestore from '@react-native-firebase/firestore';
import RightArrow from 'react-native-vector-icons/EvilIcons';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Navigationstrings from '../../../Navigation/Navigationstrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import testSvg from '../../Images/EmptyImage.jpeg'; 
const DATA = [];
// create a component
const WeightCal = props => {
  var foc = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [Array, setArray] = useState([]);
  const {t, i18n} = useTranslation();
  let [counter, setCounter] = useState(0);
  let [DiscountAmmount, setDiscountAmmount] = useState(0);
  const [PromoCode, setPromoCode] = useState('');
  const [id, setId] = useState(0)
  const makeincCount = () => {
    setCounter((counter = counter + 1));
  };
  const [Loader,setLoader] = useState(false)
  const [LocalStogae, setLocalStogae] = useState(null);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    setLoader(true)
    async function fetchValue() {
      try {
        // currentUser = await AsyncStorage.setItem('@currentUser', user.uid);
        const authStatus = await AsyncStorage.getItem('authStatusChecker');
        setLocalStogae(authStatus);
        AsyncStorage.getItem('basketArray').then(req => {
          setArray(JSON.parse(req));
          setLoader(false)
        });
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
  }, [foc]);
  const DeleteBasket = useCallback(async()=>{ 
  // const DeleteBasket = async () => {
    setLoader(true)
    try {
      await AsyncStorage.removeItem('basketArray');
      console.log('remove');
      Toast.show({
        type: 'success',
        text1: t('Connexion réussie'),
        text2: t('Supprimer le panier avec succès.'),
      });
      setArray(null)
      setLoader(false)
      
    } catch (exception) {
      console.log('Not Remove');
      Toast.show({
        type: 'error',
        text1: 'Obtenez déjà',
        text2: t('Il y a une erreur essayez à nouveau'),
      });
      setLoader(false)
      
    }
  },[useEffect]);
  // let [data, setData] = useState([{}, {}]);

  // const getCartData = async () => {
  //   try {
  //     const cart = await firestore().collection('cart').get();
  //     data = cart.docs.map(item => {
  //       return item._data;
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const func = async(index,type) =>{
    setId(()=>index) ;
    console.log(id)
    if(id===index){
      if(type==='increment'){
        makeincCount()
      }
      else{
        makedecCount()
      }

    }
    else{
      setCounter(1)
    }
  }
  const makedecCount = async(index) => {
    
   
      counter == 0 ? setCounter(0) : setCounter(counter - 1);
  };

  const navigateToDeliveryMethod = id => {
    props.navigation.navigate(Navigationstrings.DeliveryMethodsU, {
      basketarray: id,
      selectItem: counter,
      TotalPrice: id.newPrice * counter - DiscountAmmount,
    });
  };
  const PromoDiscount = id => {
    let array = null;
    const subscriber = firestore()
      .collection('Discount')
      .onSnapshot(documentSnapshot => {
        array = documentSnapshot.docs.map(d => d.data());
        array.map(d => {
          if (d.Discount.Code === PromoCode) {
            // if (d.Discount.Code === 'bn') {
          
            setDiscountAmmount(
              (d.Discount.DiscountPercent / 100) * id.newPrice,
            );
          }
        });
      });
  };
  // const Item = ({type, item}) => (

  // );

  const renderItem = ({item,index}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.superCartContainer}>
          <View style={styles.firstContainer}>
            {/* First Row */}
            <View style={styles.firstRow}>
              <View>
                <View style={styles.cartContaineer}>
                  <View>
                    <Image
                      source={cartIcon}
                      resizeMode="contain"
                      style={styles.cartIcon}
                    />
                  </View>
                  <View>
                    <Text style={styles.cartText}>
                      {/* {t('Fret Par')} {t(type)} */}
                      {item.shipMeth}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.cartsubText}>{t('Tout supprimer')}</Text>
              </View>
            </View>
            {/* second Row */}
            <View style={styles.secondRow}>
              <View>
                <Text style={styles.WeightCalText}>{item.newPrice}€/kg</Text>
                <Text style={styles.WeightCalSubText}>
                  {t('Carton')} {item.productName}
                </Text>
                <Text style={styles.WeightCalSubText}>Expédiés à</Text>
                <Text style={styles.WeightCalSubText}>{item.shipCountry}</Text>
              </View>
              <View style={styles.coounterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => {
                    func(index,"decrement");
                  }}>
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.counterTExt}>{index===id?counter:0}</Text>
                </View>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => {
                    func(index,"increment");
                  }}>
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Third Row */}
            <View style={styles.thirdRow}>
              <View style={styles.buttonContaineer}>
                <View>
                  <TextInput
                    style={styles.discountCodeInputStyle}
                    placeholder={t('Code remise ou avoir')}
                    value={PromoCode}
                    // placeholderTextColor={'#888'}
                    // onChangeText={text=>setPromoCode(text)}
                    // onChangeText={text => setPromoCode(text)}
                    onChangeText={text => setPromoCode(text)}
                  />
                </View>
                <TouchableOpacity>
                  <RightArrow
                    color={'#DDDDDD'}
                    size={25}
                    name="chevron-right"
                    onPress={() => PromoDiscount(item)}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.priceText}>-{id===index?DiscountAmmount:0}€</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total {t('remise')}</Text>
            <Text style={styles.totalText}>{id===index?DiscountAmmount:0} €</Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {index===id?item.newPrice * counter - DiscountAmmount:0} €
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          disabled={item.newPrice * counter - DiscountAmmount===0?true: false}
          activeOpacity={.2}
          onPress={() => {
            navigateToDeliveryMethod(item);
          }}>
          <Text style={styles.btnText}>
            {t('Valider')} panier {t('Fret Par')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // useEffect(() => {
  //   getCartData();
  // }, [getCartData]);

  return (
    <View style={{ backgroundColor:'#fff',height:'100%' }}>
      <ScrollView>
        <Curvedheader />

        {LocalStogae === null ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.ButtonContainer}
              onPress={() =>
                props.navigation.navigate(Navigationstrings.Login)
              }>
              <Text style={styles.ButtonText}>{t('Valider')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          
          <View>
{
  Array === null?
  <View><Image source={testSvg} /></View>
  :
<View>
<TouchableOpacity
              onPress={DeleteBasket}
              style={styles.btnClearBasket}>
              <Text style={styles.btnClearBasketText}>Clear basket</Text>
            </TouchableOpacity>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Array}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
</View>
}
           
          </View>
        )}
      </ScrollView>
    </View>
  );
};

//make this component available to the app
export default WeightCal;
