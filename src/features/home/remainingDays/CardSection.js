import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Progress} from '.';
import icon from '../../../assets/images/icon.jpg';
import fonts from '../../../utils/fonts';

export default (Card = props => {
  renderMessageView = message => (
    <View style={style.messageBlock}>
      <Image
        style={style.icon}
        resizeMode="contain"
        width={80}
        height={60}
        source={icon}
      />

      <Text style={style.messageText} numberOfLines={3}>
        {message}
      </Text>
    </View>
  );

  const {title, subtitle, message, maxVal, currVal} = props;
  return (
    <View style={[style.container, {...props.style}]}>
      <Text style={style.title}>{title}</Text>
      {renderMessageView(`${message}`)}
      <Progress subtitle={subtitle} maxVal={maxVal} currVal={currVal} />
    </View>
  );
});

const style = StyleSheet.create({
  icon: {
    flex: 1,
  },
  messageBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  messageText: {
    textAlign: 'left',
    flex: 3,
    marginLeft: 5,
    fontSize: 15,
    fontFamily: fonts.Medium,
  },
  title: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: fonts.Medium,
  },
  container: {},
});
