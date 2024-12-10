import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    width: windowWidth * 1.0,
    height: windowHeight * 1.0,
  },
  AllSettingContainer: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  settingItemContainer: {
    backgroundColor: '#fff',
    width: windowWidth * 0.85,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 2,
  },
  LogoutContainer: {
    backgroundColor: '#fff',
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 2,
    marginBottom: windowHeight * 0.05,
  },
  settingItemTextContainer: {
    fontFamily: commonStyle.regular,
    fontSize: 14,
    color: '#000',
    textAlign: 'justify',
    // backgroundColor: 'tomato',
    width: windowWidth * 0.45,
    textAlignVertical: 'center',
  },
  iconContainer: {
    //     backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsCondTextContainer: {
    // backgroundColor: 'tomato',
    alignSelf: 'center',
    width: windowWidth * 0.8,
    alignItems: 'flex-start',
  },
  termsCondText: {
    textAlign: 'center',
    color: '#042C5C',
    fontFamily: commonStyle.regular,
    fontSize: 14,
  },
  ButtonContainer: {
    width: 250,
    height: 45,
    borderRadius: 60,
    justifyContent: 'center',
    backgroundColor: '#3292E0',
    marginTop: '5%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  ButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: commonStyle.regular,
  },
});

export default styles;
