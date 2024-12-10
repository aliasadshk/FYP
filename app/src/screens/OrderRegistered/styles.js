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
  headingTextContainer: {
    //     backgroundColor: 'tomato',
    marginTop: windowHeight * 0.03,
    alignSelf: 'center',
  },
  headingText: {
    fontFamily: commonStyle.Bold,
    fontSize: 18,
    color: '#000',
  },
  AddressAndOr: {
    backgroundColor: '#3292E0',
    width: windowWidth * 0.7,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: windowHeight * 0.02,
  },
  AddressAndOrText: {
    color: '#fff',
    fontSize: 14,
    //     backgroundColor: 'gold',
    width: windowWidth * 0.5,
    textAlign: 'center',
  },
});

export default styles;
