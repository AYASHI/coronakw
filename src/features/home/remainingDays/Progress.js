import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

export default (Progress = props => {
  const {t} = useTranslation();

  progPerc = (max, curr) => {
    if (max && curr) {
      console.log((curr * 100) / max + '%');
      return Math.floor((curr * 100) / max) + '%';
    }
    return 0;
  };

  renderSubTitle = subtitle => {
    return (
      <View
        style={{
          marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={style.text}>{subtitle}</Text>
        <Text style={style.text}>{getRatio()}</Text>
      </View>
    );
  };

  getRatio = () => {
    const {maxVal, currVal} = props;

    return t('remainingDays.ratioTitle', {
      current: currVal.toLocaleString(i18next.language),
      total: maxVal.toLocaleString(i18next.language),
    });
  };

  const {maxVal, currVal, subtitle} = props;
  return (
    <View style={{width: '100%', marginTop: '5%'}}>
      {renderSubTitle(subtitle)}
      <View style={style.progCont}>
        <View style={[style.prog, {width: progPerc(maxVal, currVal)}]} />
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  progCont: {
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.tealishDisabled,
    justifyContent: 'center',
  },
  prog: {
    backgroundColor: colors.tealish,
    height: 6,
    borderRadius: 10,
    position: 'absolute',
    width: '50%',
  },
  text: {
    color: colors.tealish,
    fontFamily: fonts.Medium,
    fontSize: 15,
  },
});
