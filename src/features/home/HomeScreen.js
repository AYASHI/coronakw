import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import HealthSurveyModal from '../../components/HealthSurveyModal';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <HealthSurveyModal />
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
