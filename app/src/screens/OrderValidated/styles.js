import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnContainer: {
    backgroundColor: '#3292E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.7,
    height: windowHeight * 0.07,
    borderRadius: 40,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: commonStyle.regular,
  },
  textHeading: {
    fontSize: 18,
    color: '#1C1939',
    fontFamily: commonStyle.regular,
  },
  textHeadingContainer: {
    marginTop: windowHeight * 0.03,
  },
});

export default styles;
