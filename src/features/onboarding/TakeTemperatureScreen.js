import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Screens from '../../navigators/Screens';
import TemperatureView from '../../components/TemperatureView';

const TakeTemperatureScreen = ({navigation}) => {
  const confirmTemperature = degree => {
    navigation.navigate(Screens.TakeLocation);
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <TemperatureView onTemperatureConfirm={confirmTemperature} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default TakeTemperatureScreen;
