import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabsContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 1.0,
    height: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    position: 'absolute',
    top: windowHeight * 0.08,
  },
  tabNameContainer: {
    // backgroundColor: 'green',
    borderBottomColor: '#fff',
    // borderBottomWidth: 2,
  },
  tabarTextStyle: {
    fontFamily: commonStyle.regular,
    fontSize: 8,
    color: '#fff',
    textAlign: 'center',
  },
  headerStyle: {
    backgroundColor: '#3292E0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 280,
    borderBottomEndRadius: 250,
    borderBottomLeftRadius: 250,
    transform: [{scaleX: 1.3}],
    zIndex: 1,
  },
  mainTextStyle: {
    fontFamily: commonStyle.Bold,
    fontSize: 14,
    color: '#fff',
  },
  INContainer: {
    width: 100,
    height: windowHeight * 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    marginLeft: 170,
    marginRight: 140,
    // marginTop: 60,
  },
  imageStyler: {
    width: windowWidth * 0.14,
    height: windowHeight * 0.09,
  },
  subTabbarContainer: {
    backgroundColor: '#DCE5F4',
    height: windowHeight * 0.055,
    width: windowWidth * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
    // padding: 10,
    elevation: 5,
    // marginBottom: 10,
  },
  subTabbarScrollContainer: {
    alignSelf: 'center',
    // backgroundColor: 'tomato',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconStyler: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  imageTextContainer: {
    flexDirection: 'row',
    height: windowHeight * 0.035,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: windowWidth * 0.28,
    // margin: 5,
  },
  subtabarTextStyle: {
    fontFamily: commonStyle.regular,
    fontSize: 7,
    color: '#000',
    // backgroundColor: 'gold',
    width: windowWidth * 0.2,
    height: windowHeight * 0.035,
    textAlign: 'center',
    textAlignVertical: 'center',
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
});

export default styles;
