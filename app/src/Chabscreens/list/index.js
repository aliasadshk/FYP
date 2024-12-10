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
  Image
} from 'react-native';
import commonStyle from '../../helper/commonStyle';
import {useTranslation} from 'react-i18next';
import Curvedheader from '../../Components/Curvedheader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Search from 'react-native-vector-icons/MaterialIcons';
import Home from 'react-native-vector-icons/Ionicons';
import DotIcon from 'react-native-vector-icons/Octicons';
import sd from '../../Images/cablogo.png';

function List(props) {
  const {t, i18n} = useTranslation();
  const [List, setList] = useState([{id: 1,Val:'Commande #1000',SubVal:'A livrer'},{id: 1,Val:'Commande #999',SubVal:'A livrer'},{id: 1,Val:'Commande #998',SubVal:'A livrer'},{id: 1,Val:'Commande #997',SubVal:'A livrer'},{id: 1,Val:'Commande #996',SubVal:'A livrer'}]);
  const FlatListView = ({item, index}) => {
    return (
      <View>
      <View style={styles.MainContainer}>
        <View style={{width: '100%', marginTop: 15,flexDirection:'row'}}>
        <DotIcon color={'#EE5A30'} name="dot-fill" size={18} style={{alignSelf:'center'}}/>
          <View style={{marginTop: 5}}>
            <Text style={[styles.MainContainerText,{color: '#000'}]}>
              {item.Val}
            </Text>
            <Text style={styles.MainContainerText}>{item.SubVal}</Text>
          </View>
        </View>
      </View>
      <View style={styles.ViewLine}/>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyler} source={sd} resizeMode="center" />
      
      <View style={styles.headerTextcontainer}/>
      <FlatList
        data={List}
        renderItem={FlatListView}
        keyExtractor={item => item.id}
        scrollEnabled
      />
      <TouchableOpacity style={styles.HomeContainer} onPress={()=>props.navigation.navigate('Dreawer')}>
      <Home color={'#fff'} name="home" size={35} style={{alignSelf:'center'}}/>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: windowHeight * 1.0,
  },
  MainContainer: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 9,
    
  },
  FlatListContainer:{
    width: 60,
  height: 60,
  backgroundColor: '#DFE7F5',
  justifyContent: 'center',
  marginTop: 10,
  borderRadius: 50,
  marginLeft:30
  },
  MainContainerText: {
    width: '100%',
    marginLeft: '13%',
    fontSize: 14,
    fontFamily: commonStyle.regular,
    color: '#B6B7B7',
    // backgroundColor: 'tomato',
  },
  FlatText:{
    marginTop:10,
    marginLeft: '6%',
    width: '62%',
  },
  headerTextcontainer: {
    // backgroundColor: 'red',
    width: windowWidth * 0.6,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  
  ViewLine:{
width:'100%',
height:1.8,
backgroundColor: 'lightgray'
  },
  imageStyler: {
    width: windowWidth * 1.0,
    alignSelf:'center',
  },
  Leftcontainer:{
    width: windowWidth* .3,
    height: windowHeight* .28,
    backgroundColor: '#90BE21',
    marginBottom:20,
    borderBottomEndRadius:50,
    borderTopRightRadius:50
  },
  LeftcontainerSecond:{
    width: windowWidth* .75,
    height: windowHeight* .2,
    backgroundColor: '#FFFFFF',
    marginBottom:20,
    borderBottomEndRadius:20,
    borderTopLeftRadius:40,
    borderTopRightRadius:20,
    borderBottomLeftRadius:40,
    marginLeft:'-16%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 5,
    backgroundColor: '#fff',
    marginTop:25,
    justifyContent:'center',
  },
  LeftcontainerSecondText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    fontFamily: commonStyle.regular,
    fontSize: 16,
  },
  LeftcontainerSecondSubText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    marginTop:8,
    fontFamily: commonStyle.regular,
    fontSize: 16,
  },
  ButtonStyle:{
    backgroundColor: '#FC6011',
    width: '60%',
    justifyContent: 'center',
    height:windowHeight * 0.05,
    borderRadius:70,
    alignSelf:'center',
    marginTop:20
  },
  ButtonStyleText:{
    textAlign: 'center',
    color:'#fff'
  },
  HomeContainer:{
    width:60,
    height: 60,
    backgroundColor: '#B6B7B7',
    borderRadius:50,
    alignSelf:'center',
    marginBottom:10,
    justifyContent: 'center',
  },
});
export default List;
