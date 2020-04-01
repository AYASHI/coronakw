import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixelRatio} from 'react-native';

const scaleFont = size => size * PixelRatio.getFontScale();
// const screenSize = wp('100%') + hp('100%');
// const getDimensions = {
//   width: wp('100%'),
//   height: hp('100%'),
// };
const sizes = {
  // font sizes
  font: scaleFont(18), //18
  h1: scaleFont(20), //20
  h2: scaleFont(16), //16
  h3: scaleFont(14), //14
  h4: scaleFont(12), //12
  title: scaleFont(24), //24
  title2: scaleFont(22), //22
  header: scaleFont(26), //26
  customFont: size => scaleFont(size),
};
export const fonts = {
  default: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.font,
  },
  h1: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h1,
  },
  h2: {
    //fontFamily: 'Rubik-Medium',
    fontSize: sizes.h2,
  },
  h3: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.h3,
  },
  h4: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h4,
  },
  header: {
    //fontFamily: 'Rubik-Bold',
    fontSize: sizes.header,
  },
  title: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title,
  },
  title2: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title2,
  },
};
export const colors = {
  cgreen: '#26c1c9',
  primary: '#FFFFFF',
  secondary: '#F5138E',
  black: '#000000',
  gray: '#979797',
  gray2: '#707070',
  gray5: '#505050',
  gray3: '#2C262B',
  gray4: '#1A1A1A',
  black2: '#120810',
};
