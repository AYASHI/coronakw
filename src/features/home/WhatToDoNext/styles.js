import {StyleSheet} from 'react-native';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  subtitle: {
    fontFamily: fonts.Medium,
    textAlign: 'left',
    fontSize: 15,
    marginStart: 10,
    flexWrap: 'wrap',
  },
  temperature: {
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 16,
    marginTop: 32,
  },
  instructionText: {
    textAlign: 'left',
    fontFamily: fonts.Bold,
    color: colors.marine,
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 150,
    marginBottom: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  infoText: {
    color: colors.opacityBlack,
    marginBottom: 8,
    fontSize: 15,
    opacity: 0.77,
    textAlign: 'left',
  },
  keyboardAvoiding: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'stretch',
  },
  languageButton: {
    backgroundColor: '#f5f5f9',
    marginLeft: 20,
    marginTop: 7,
    marginBottom: 7,
    marginRight: 20,
  },
  languageButtonText: {
    color: '#0254af',
  },
});
