import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  upperTextContainer: {
    //     backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperText: {
    fontFamily: commonStyle.regular,
    color: '#1C1939',
    fontSize: 29,
    alignSelf: 'center',
    textAlign: 'center',
  },
  lowerText: {
    fontFamily: commonStyle.regular,
    color: 'silver',
    fontSize: 14,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.02,
    alignSelf: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    //     backgroundColor: 'tomato',
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otpInputcontainer: {
    marginTop: 10,
    //     backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: 50,
    height: 50,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1939',
  },
  otpInput: {
    color: '#1C1939',
    fontSize: 35,
    height: windowHeight * 0.07,
    //     backgroundColor: 'tomato',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  resendCodeTextContainer: {
    //     backgroundColor: 'green',
    marginTop: windowHeight * 0.02,
  },
  resendCodeText: {
    color: '#2D9EE5',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: windowHeight * 0.05,
    fontFamily: commonStyle.regular,
  },
  buttonCountineContainer: {
    backgroundColor: '#3292E0',
    borderRadius: 50,
    width: windowWidth * 0.8,
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginTop: windowHeight * 0.05,
  },
  ContinuerText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: commonStyle.regular,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30, color: '#000'},
  codeFieldRoot: {
    marginTop: 50,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#fff',
    fontFamily: commonStyle.regular,
    elevation: 3,
    borderRadius: 5,
    margin: 3,
    color: '#000',
  },
  focusCell: {
    borderColor: '#000',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
