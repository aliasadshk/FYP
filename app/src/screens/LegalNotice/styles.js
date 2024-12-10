import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AllTextContainer: {
    // backgroundColor: 'tomato',
    flex: 1,
    padding: 10,
    margin: 10,
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontFamily: commonStyle.regular,
    fontSize: 14,
    color: '#000',
  },
});

export default styles;
