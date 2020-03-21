import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import layout from '../utils/layout';
import fonts from '../utils/fonts';
import colors from '../utils/colors';
import {useTranslation} from 'react-i18next';
import LocationView from './LocationView';

const CurrentPositionFragment = props => {
  const {t} = useTranslation();
  const onLocationSelected = location => {};
  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>{t('currentPosition.title')}</Text>
        <Text style={styles.subtitle}>{t('currentPosition.subtitle')}</Text>
        <LocationView onLocationSelected={onLocationSelected} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: layout.margin,
  },
  subtitle: {
    fontFamily: fonts.REGULAR,
    color: colors.gray,
    fontSize: 17,
    textAlign: 'left',
    padding: 5,
  },
  title: {
    fontFamily: fonts.REGULAR,
    textAlign: 'left',
    fontSize: 20,
    padding: 5,
  },
});

export default CurrentPositionFragment;
