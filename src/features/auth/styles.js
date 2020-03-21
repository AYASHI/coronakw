import {StyleSheet} from 'react-native';
import fonts from '../../utils/fonts';
import colors from '../../utils/colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  instructionText: {
    textAlign: 'left',
    fontFamily: fonts.Bold,
    color: colors.marine,
    fontSize: 20,
    width: '90%',
  },
  logo: {
    width: 161,
    height: 240,
    marginBottom: 60,
    marginTop: 0,
    resizeMode: 'contain',
  },
  infoText: {
    color: colors.opacityBlack,
    marginBottom: 8,
    fontSize: 15,
    opacity: 0.77,
    textAlign: 'left',
    width: '90%',
  },
});
