import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import layout from '../utils/layout';
import StatusSelectionView from './StatusSelectionView';

const HomeScreenHeader = () => {
  return (
    <Fragment>
      <SafeAreaView style={styles.saveArea} />
      <View style={styles.container}>
        <Text style={styles.lastUpdateText}>اخر تحديث منذ ساعة</Text>
        <Text style={styles.howDoYouFeel}>كيف تشعر الأن؟</Text>
        <StatusSelectionView />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    backgroundColor: colors.status.green,
  },
  container: {
    height: 174,
    width: '100%',
    padding: layout.margin,
    paddingTop: 22,
    backgroundColor: colors.status.green,
  },
  lastUpdateText: {
    color: colors.opacityWhite,
    fontFamily: fonts.Semibold,
    fontSize: 15,
    textAlign: 'left',
  },
  howDoYouFeel: {
    fontFamily: fonts.Bold,
    textAlign: 'left',
    color: 'white',
    fontSize: 32,
  },
});

export default HomeScreenHeader;
