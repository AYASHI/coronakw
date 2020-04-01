import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Block, Text} from '.';
import {fonts, colors} from './theme';
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
      <Block
        style={{marginBottom: 10, marginLeft: 10, marginRight: 10}}
        row
        flex={false}>
        <Text color={colors.cgreen}>{subtitle}</Text>
        <Block />
        <Text color={colors.cgreen}>{this.getRatio()}</Text>
      </Block>
    );
  };
  renderRTL = subtitle => {
    return (
      <Block
        style={{marginBottom: 10, marginLeft: 10, marginRight: 10}}
        row
        flex={false}>
        <Text color={colors.cgreen}>{this.getRatio()}</Text>
        <Block />
        <Text color={colors.cgreen}>{subtitle}</Text>
      </Block>
    );
  };
  getRatio = () => {
    const {isLTR, maxVal, currVal} = this.props;
    if (isLTR) {
      console.log('Left to right', isLTR);
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
    width: '95%',
    height: 15,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#31dfe8',
    justifyContent: 'center',
  },
  prog: {
    backgroundColor: colors.cgreen,
    height: 13,
    borderRadius: 10,
    position: 'absolute',
    width: '50%',
  },
});
