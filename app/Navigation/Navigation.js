import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Navigationstrings from './Navigationstrings';
import SplashScreen from '../src/screens/Splash/index';
import Login from '../src/screens/Login/index';
import Signup from '../src/screens/signup/index';
import Optcode from '../src/screens/otpcode/index';
import SelectService from '../src/screens/selectService/index';
import CountryDelivery from '../src/screens/CountryDelivery/index';
import ReturnByService from '../src/screens/ReturnByService/index';
import PaymentMethods from '../src/screens/PaymentMethods/index';
import OrderedRegistered from '../src/screens/OrderRegistered/index';
import Research from '../src/screens/Research/index';
import WeightCal from '../src/screens/WeightCal/index';
import OrderValidated from '../src/screens/OrderValidated/index';
import SuccessFullyRegOrder from '../src/screens/SuccessFullyRegOrder/index';
import PaymentDetails from '../src/screens/PaymentDetails/index';
import AppSettingsMain from '../src/screens/AppSettingsMain/index';
import OrderDetails from '../src/screens/OrderDetails/index';
import Address from '../src/screens/Address/index';
import CreditCard from '../src/screens/CreditCard/index';
import ContactUs from '../src/screens/ContactUs/ContactUs';
import PickupWindow from '../src/screens/Pickupwindow/index';
import DeliveryMethodsU from '../src/screens/DeliveryMethodsU';
import Language from '../src/screens/Language/index';
import Discount from '../src/screens/Discount/index';
import Profile from '../src/screens/Profile/index';
import ServiceClientContact from '../src/screens/ContactUs/ServiceclientContact';
import ConfirmSent from '../src/screens/ContactUs/ConfirmSent';
import TermsOfUse from '../src/screens/TermsOfUse/index';
import LegalNotice from '../src/screens/LegalNotice';
import TermsAndConditions from '../src/screens/TermsAndConditions/index';
import {TouchableOpacity} from 'react-native';

const AuthStack = createNativeStackNavigator();
function AuthStackNavigator(props) {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName={'SplashScreen'}
        // initialRouteName={'Splash'}
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
        />
        <AuthStack.Screen name={Navigationstrings.Login} component={Login} />
        <AuthStack.Screen name={Navigationstrings.Signup} component={Signup} />
        <AuthStack.Screen
          name={Navigationstrings.Optcode}
          component={Optcode}
        />
        <AuthStack.Screen
          name={Navigationstrings.TermsOfUse}
          component={TermsOfUse}
        />
        <AuthStack.Screen name={'Tab'} component={TabNavigation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName={Navigationstrings.SelectService}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={Navigationstrings.SelectService}
        component={SelectService}
      />
      <HomeStack.Screen
        name={Navigationstrings.CountryDelivery}
        component={CountryDelivery}
      />
      <HomeStack.Screen
        name={Navigationstrings.ReturnByService}
        component={ReturnByService}
      />
      {/* <HomeStack.Screen name={Navigationstrings.Login} component={Login} />
        <HomeStack.Screen name={Navigationstrings.Signup} component={Signup} />
        <HomeStack.Screen
          name={Navigationstrings.Optcode}
          component={Optcode}
        />
        <HomeStack.Screen
          name={Navigationstrings.TermsOfUse}
          component={TermsOfUse}
        /> */}
    </HomeStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      initialRouteName={Navigationstrings.Research}
      screenOptions={{headerShown: false}}>
      <SearchStack.Screen
        name={Navigationstrings.Research}
        component={Research}
      />
    </SearchStack.Navigator>
  );
}

const ContactUsStack = createNativeStackNavigator();

function ContactUsStackNavigator() {
  return (
    <ContactUsStack.Navigator
      initialRouteName={Navigationstrings.ContactUs}
      screenOptions={{headerShown: false}}>
      <ContactUsStack.Screen
        name={Navigationstrings.ContactUs}
        component={ContactUs}
      />
      <ContactUsStack.Screen
        name={Navigationstrings.ConfirmSent}
        component={ConfirmSent}
      />
    </ContactUsStack.Navigator>
  );
}

const CartStack = createNativeStackNavigator();

function CartStackNavigator() {
  return (
    <CartStack.Navigator
      initialRouteName={Navigationstrings.WeightCal}
      screenOptions={{headerShown: false}}>
      <CartStack.Screen
        name={Navigationstrings.WeightCal}
        component={WeightCal}
      />
      <CartStack.Screen
        name={Navigationstrings.DeliveryMethodsU}
        component={DeliveryMethodsU}
      />
      <CartStack.Screen
        name={Navigationstrings.PickupWindow}
        component={PickupWindow}
      />
      <CartStack.Screen
        name={Navigationstrings.PaymentMethods}
        component={PaymentMethods}
      />
      <CartStack.Screen
        name={Navigationstrings.PaymentDetails}
        component={PaymentDetails}
      />
      <CartStack.Screen
        name={Navigationstrings.SuccessFullyRegOrder}
        component={SuccessFullyRegOrder}
      />
      <CartStack.Screen
        name={Navigationstrings.OrderedRegistered}
        component={OrderedRegistered}
      />
      <CartStack.Screen
        name={Navigationstrings.OrderValidated}
        component={OrderValidated}
      />
    </CartStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName={Navigationstrings.AppSettingsMain}
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name={Navigationstrings.Profile}
        component={Profile}
      />
      <ProfileStack.Screen
        name={Navigationstrings.Language}
        component={Language}
      />
      <ProfileStack.Screen
        name={Navigationstrings.Discount}
        component={Discount}
      />
      <ProfileStack.Screen
        name={Navigationstrings.AppSettingsMain}
        component={AppSettingsMain}
      />
      <ProfileStack.Screen
        name={Navigationstrings.OrderDetails}
        component={OrderDetails}
      />
      <ProfileStack.Screen
        name={Navigationstrings.Address}
        component={Address}
      />
      <ProfileStack.Screen
        name={Navigationstrings.ServiceClientContact}
        component={ServiceClientContact}
      />
      <ProfileStack.Screen
        name={Navigationstrings.ConfirmSent}
        component={ConfirmSent}
      />
      <ProfileStack.Screen
        name={Navigationstrings.CreditCard}
        component={CreditCard}
      />
      <ProfileStack.Screen
        name={Navigationstrings.LegalNotice}
        component={LegalNotice}
      />
      <ProfileStack.Screen
        name={Navigationstrings.TermsAndConditions}
        component={TermsAndConditions}
      />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#3292E0',
          height: 60,
          alignItems: 'center',
        },
        tabBarHideOnKeyboard: true,
        tabBarButton: props => (
          <TouchableOpacity {...props} activeOpacity={0.5} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({tintColor}) => (
            <EntypoIcon name="home" color={'#fff'} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({tintColor}) => (
            <MaterialIcon name="search" color={'#fff'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactUsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({tintColor}) => (
            <IoniconsIcon name="mail" color={'#fff'} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({tintColor}) => (
            <MaterialCommunityIcon name="cart" color={'#fff'} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({tintColor}) => (
            <FontAwesome5Icon name="user-alt" color={'#fff'} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthStackNavigator;














// import * as React from 'react';
// import {Button, Text, View, Image} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Splash from '../src/screens/Splash/index';
// import SignUp from '../src/screens/SignUp/index';
// import ClintAddress from '../src/screens/shipping/client';
// import ResturantAddress from '../src/screens/shipping/restaurant';
// import GetStart from '../src/screens/GetStarted/index';
// import Dreawer from '../src/screens/Drawer/index';
// import CodeSend from '../src/screens/Codevalidation/index';
// import Asset from '../src/screens/asset/index';
// import List from '../src/screens/list/index';
// const Stack = createStackNavigator();
// export default function Auth(props) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}>
//         <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="GetStart" component={GetStart} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="Dreawer" component={Dreawer} />
//         <Stack.Screen name="Asset" component={Asset} />
//         <Stack.Screen name="ResturantAddress" component={ResturantAddress} />
//         <Stack.Screen name="CodeSend" component={CodeSend} />
//         <Stack.Screen name="ClintAddress" component={ClintAddress} />
//         <Stack.Screen name="List" component={List} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }





