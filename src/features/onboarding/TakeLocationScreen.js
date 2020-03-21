import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Button from '../../components/Button';
import {useTranslation} from 'react-i18next';
import Screens from '../../navigators/Screens';

const TakeLocationScreen = ({navigation}) => {
  const {t} = useTranslation();

  const confirm = () => {
    navigation.navigate(Screens.Home);
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={styles.container}>
        <Text>LocationScreen</Text>
        <Button text={t('button.confirm')} onPress={confirm} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default TakeLocationScreen;
