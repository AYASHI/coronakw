import React from 'react';
import {  StyleSheet, View, Text} from 'react-native';
import {  colors} from './theme';
import fonts from '../../../utils/fonts';

export default class Progress extends React.Component {
  progPerc = (max, curr) => {
    if (max && curr) {
      console.log((curr * 100) / max + '%');
      return Math.floor((curr * 100) / max) + '%';
    }
    return 0;
  };

  renderLTR = subtitle => {
    return (
      <View
        style={{
          marginBottom: 8, 
          flexDirection:'row',
          justifyContent: 'space-between'
        }}
        >
        <Text style={style.text}>{subtitle}</Text>
        <Text style={style.text}>{this.getRatio()}</Text>
      </View>
    );
  };

  getRatio = () => {
    const {isLTR, maxVal, currVal} = this.props;
    if (isLTR) {
      return ' Day ' + currVal + '/' + maxVal;
    }
    return (
      maxVal.toLocaleString('ar-EG') +
      '/' +
      currVal.toLocaleString('ar-EG') +
      'يوم '
    );
  };

  render() {
    const {maxVal, currVal, subtitle, isLTR} = this.props;
    return (
      <View style={{width: '100%', marginTop: '5%'}}>
        {isLTR ? this.renderLTR(subtitle) : this.renderRTL(subtitle)}
        <View style={style.progCont}>
          <View
            style={[
              style.prog,
              {width: this.progPerc(maxVal, currVal)},
              isLTR ? {left: 0} : {right: 0},
            ]}
          />
        </View>
      </View>
    );
  }
}

//English to Arabic digits.
function toArabic(digit) {
  return digit.toString().proto.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

const style = StyleSheet.create({
  progCont: {
    height: 6,
    borderRadius: 10,
    backgroundColor: '#31dfe8',
    justifyContent: 'center',
  },
  prog: {
    backgroundColor: colors.cgreen,
    height: 6,
    borderRadius: 10,
    position: 'absolute',
    width: '50%',
  },
  text: {
    color: colors.cgreen,
    fontFamily: fonts.Medium,
    fontSize: 15
  }
});
