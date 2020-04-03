import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import images from '../utils/images';

const ChatView = props => {
  const {t} = useTranslation();
  return (
    <View style={{alignItems: 'center', height: 120, marginBottom: 16}}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={images.chat} />
      </TouchableOpacity>
      <Text style={styles.title}>{t('chat.title')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.gray,
    fontFamily: fonts.REGULAR,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ChatView;
