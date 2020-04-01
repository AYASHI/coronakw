import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text as Typo, Block, Progress} from '.';
import {colors} from './theme';
import icon from '../../../assets/images/icon.jpg';

export default class Card extends React.Component {
  // For English
  renderLTR = message => (
    <Block center style={{marginTop: '5%', width: '98%'}} flex={false} row>
      <Image
        style={style.icon}
        resizeMode="contain"
        width={80}
        height={80}
        source={icon}
      />
      <Typo
        style={{paddingLeft: 20, width: '78%'}}
        left
        numberOfLines={2}
        color={colors.black}>
        {message}
      </Typo>
    </Block>
  );
  // For Arabic
  renderRTL = message => (
    <Block center style={{marginTop: '5%', width: '98%'}} flex={false} row>
      <Typo
        style={{paddingLeft: 20, width: '78%'}}
        right
        numberOfLines={2}
        color={colors.black}>
        {message}
      </Typo>
      <Image
        style={style.icon}
        resizeMode="contain"
        width={80}
        height={80}
        source={icon}
      />
    </Block>
  );

  render() {
    const {title, subtitle, message, maxVal, currVal, isLTR} = this.props;
    return (
      <Block
        right
        middle
        style={{marginLeft: 10, marginRight: 10}}
        flex={false}>
        <Typo
          style={{marginRight: 10}}
          color={colors.gray}
          right={isLTR ? false : true}
          left={isLTR ? true : false}
          numberOfLines={2}
          h3>
          {title}
        </Typo>
        {isLTR ? this.renderLTR(message) : this.renderRTL(message)}
        <Progress
          isLTR={isLTR}
          subtitle={subtitle}
          maxVal={maxVal}
          currVal={currVal}
        />
      </Block>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
  },
});
