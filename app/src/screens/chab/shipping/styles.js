import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  HeadingText: {
    color: '#4A4B4D',
    fontSize: 24,
    marginLeft: '15%',
    marginTop: 50,
  },
  SubHeadingText: {
    color: '#4A4B4D',
    fontSize: 16,
    marginLeft: '8%',
    marginTop: 35,
    marginBottom:10
  },
  LineStyle: {
    backgroundColor: 'lightgray',
    width: '86%',
    height: 1.5,
    alignSelf: 'center',
    marginTop: 15,
  },
  AddressContainer: {
    backgroundColor: '#F7F7F7',
    marginTop: 40,
    width: '100%',
    height: windowHeight * 0.32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginBottom: 30,
  },
  AddressContainerText: {
    marginLeft: '12%',
    color: '#4A4B4D',
    marginTop:30
  },
  LeftButton:{
    width: '34%',
    height:40,
    borderWidth:1.5,
    borderColor:'#90BE21',
    marginLeft:'10%',
    justifyContent:'center',
    borderRadius:60
  },
  LeftButtonText:{
    textAlign:'center',
    color:'#FC6011'
  },
  ButtonStyle: {
    backgroundColor: '#FC6011',
    width: '86%',
    justifyContent: 'center',
    height: windowHeight * 0.07,
    borderRadius: 70,
    alignSelf: 'center',
    marginTop: 5,
  },
  ButtonStyleText: {
    textAlign: 'center',
    color: '#fff',
  },
  HomeContainer:{
    marginTop:windowHeight * 0.16,
    width:60,
    height: 60,
    backgroundColor: '#B6B7B7',
    borderRadius:50,
    alignSelf:'center',
    marginBottom:10,
    justifyContent: 'center',
  },
});

export default styles;
