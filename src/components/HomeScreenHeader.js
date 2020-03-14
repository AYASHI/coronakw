import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';

const HomeScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text> </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 218,
    width: '100%',
    backgroundColor: colors.status.green,
  },
});

export default HomeScreenHeader;
