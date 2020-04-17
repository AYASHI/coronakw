import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './styles';
import images from '../../../utils/images';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';

const normalCaseItems = translator => [
  {
    title: translator('whatToDoNext.stayDistanced'),
    image: images.crowd,
    action: () => {},
  },
  {
    title: translator('whatToDoNext.dontTouch'),
    image: images.touchMouth,
    action: () => {},
  },
  {
    title: translator('whatToDoNext.whashHand'),
    image: images.washhands,
    action: () => {},
  },
];

const badCaseItems = translator => [
  {
    title: translator('whatToDoNext.callhospital'),
    image: images.callhospital,
    action: () => {
      Linking.openURL(`tel:${151}`);
    },
  },
];

export default (WhatToDoNext = props => {
  const {t} = useTranslation();
  const {status} = props;
  return (
    <View>
      <Text style={styles.title}>{t('whatToDoNext.howToAvoid')}</Text>
      <FlatList
        data={status == 3 ? badCaseItems(t) : normalCaseItems(t)}
        renderItem={item => {
          return <WhatToDoNextItem element={item} action={item.item.action} />;
        }}
        keyExtractor={item => item.title}
      />
    </View>
  );
});

const WhatToDoNextItem = ({element, action}) => {
  const {item} = element;
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.content} onPress={action}>
        <Image source={item.image} />
        <Text style={styles.subtitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
