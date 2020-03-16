import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import HomeScreenBody from '../../components/HomeScreenBody';
import HealthSurveyModal from '../../components/HealthSurveyModal';
import TemperatureModal from '../../components/TemperatureModal';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <HomeScreenBody />
      <HealthSurveyModal />
      <TemperatureModal />
    </View>
  );
};
const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
export default HomeScreen;
