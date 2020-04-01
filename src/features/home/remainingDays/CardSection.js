import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Text as Typo, Block, Progress} from '.';
import {colors} from './theme';
import icon from '../../../assets/images/icon.jpg';

export default class Card extends React.Component {
  // For English
  
  // For Arabic
  renderMessageView = message => (
    <View style={style.messageBlock} >
      <Image
        style={style.icon}
        resizeMode="contain"
        width={80}
        height={80}
        source={icon}
      />
      
      <Text
        style = {style.messageText}
        numberOfLines = {3}
      >
       {message}
      </Text>
    </View>
  );

  render() {
    const {title, subtitle, message, maxVal, currVal, isLTR} = this.props;
    return (
      <View
        style={[style.container, {...this.props.style}]}>
        <Text
          style={style.title}>
          {title}
        </Text>
        {this.renderMessageView(message)}
        <Progress
          isLTR={true}
          subtitle={subtitle}
          maxVal={maxVal}
          currVal={currVal}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    flex: 1
  },
  messageBlock:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent: 'flex-start', 
  },
  messageText: {
    textAlign: 'left',
    flex: 3,
    marginLeft: 5
  },
  title: {
    textAlign: 'left'
  },
  container: {
  }
});
