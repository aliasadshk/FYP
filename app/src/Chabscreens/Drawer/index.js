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
  FlatList,
} from 'react-native';
import commonStyle from '../../helper/commonStyle';
import {useTranslation} from 'react-i18next';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Search from 'react-native-vector-icons/MaterialIcons';
import Dona from 'react-native-vector-icons/FontAwesome5';
import Info from 'react-native-vector-icons/Entypo';

function Discount(props) {
  const {t, i18n} = useTranslation();
  const [List, setList] = useState([{id: 1}, {id: 2}, {id: 3}]);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerTextcontainer}/>
      <TouchableOpacity style={styles.MainContainer} onPress={()=>props.navigation.navigate('Asset')}>
        <View style={styles.FlatListContainer}>
        <Dona color={'#707070'} name="donate" size={30} style={{alignSelf:'center'}}/>
        </View>
        <Text style={styles.FlatText}>Travailler</Text>
        <TouchableOpacity style={styles.ButtonStyle} >
        <Search color={'#000'} name="navigate-next" size={20} style={{alignSelf:'center'}}/>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MainContainer} onPress={()=>props.navigation.navigate('Asset')}>
        <View style={styles.FlatListContainer}>
        <Dona color={'##707070'} name="shopping-bag" size={30} style={{alignSelf:'center'}}/>
        </View>
        <Text style={styles.FlatText}>Historique</Text>
        <TouchableOpacity style={styles.ButtonStyle} >
        <Search color={'#000'} name="navigate-next" size={20} style={{alignSelf:'center'}}/>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MainContainer} onPress={()=>props.navigation.navigate('Asset')}>
        <View style={styles.FlatListContainer}>
        <Info color={'#707070'} name="info" size={30} style={{alignSelf:'center'}}/>
        </View>
        <Text style={styles.FlatText}>Déconnexion</Text>
        <TouchableOpacity style={styles.ButtonStyle}>
        <Search color={'#000'} name="navigate-next" size={20} style={{alignSelf:'center'}}/>
        </TouchableOpacity>
      </TouchableOpacity>
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
    width: '85%',
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
  FlatListContainer:{
    width: 60,
  height: 60,
  backgroundColor: '#DFE7F5',
  justifyContent: 'center',
  marginTop: 20,
  borderRadius: 50,
  marginLeft:30
  },
  ButtonStyle: {
    width: 40,
    height: 40,
    backgroundColor: '#DFE7F5',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 50,
  },
  MainContainerText: {
    width: '80%',
    marginLeft: '13%',
    fontSize: 11,
    fontFamily: commonStyle.regular,
    color: '#000',
    // backgroundColor: 'tomato',
  },
  FlatText:{
    marginTop:40,
    marginLeft: '6%',
    width: '62%',
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
