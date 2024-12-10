import {StyleSheet, Dimensions} from 'react-native';
import commonStyle from '../../helper/commonStyle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //     justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#2CA4E8',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.8,
    height: windowHeight * 0.063,
    borderRadius: 10,
    marginTop: windowHeight * 0.03,
  },
  iconContainer: {
    // backgroundColor: 'tomato',
    marginLeft: windowWidth * 0.03,
  },
  SearchInputStyle: {
    // backgroundColor: 'tomato',
    width: windowWidth * 0.6,
    color: '#000',
    fontFamily: commonStyle.regular,
  },
});

export default styles;
