import {I18nManager} from 'react-native';

const _font = {
  light: {
    ar: 'ArabicUIText-Light',
    en: 'SFUIDisplay-Light',
  },
  regular: {
    ar: 'ArabicUIText',
    en: 'SFUIDisplay-Regular',
  },
  bold: {
    ar: 'ArabicUIText-Bold',
    en: 'SFUIDisplay-Bold',
  },
  semiBold: {
    ar: 'ArabicUIText-Semibold',
    en: 'SFUIDisplay-Semibold',
  },
  medium: {
    ar: 'ArabicUIText-Medium',
    en: 'SFUIDisplay-Medium',
  },
};

const fontPicker = font => {
  return I18nManager.isRTL ? font.ar : font.en;
};

const fonts = {
  REGULAR: fontPicker(_font.regular),
  Bold: fontPicker(_font.bold),
  Light: fontPicker(_font.light),
  Semibold: fontPicker(_font.semiBold),
  Medium: fontPicker(_font.medium),
};

export default fonts;
