import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import fonts from '../../utils/fonts';
import HomeScreenHeader from '../../components/HomeScreenHeader';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeScreenHeader />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomeScreen;
