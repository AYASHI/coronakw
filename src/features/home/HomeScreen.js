import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import fonts from '../../utils/fonts';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: fonts.Bold}}>رعاية تك</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
