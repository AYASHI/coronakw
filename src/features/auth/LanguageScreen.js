import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import styles from './styles';
import {LogoFragment} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import * as actionTypes from '../../store/actionTypes';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Button from '../../components/Button';
import {bindActionCreators} from 'redux';

const LanguageScreen = () => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  const dispatch = useDispatch();

  const changeLanguage = newLang => {
    // Check the current langauge compared to the button press
    try {
      i18n.changeLanguage(newLang);
      dispatch({
        type: actionTypes.CHANGE_LANGUAGE,
        value: newLang,
      });
      if (newLang == 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      setTimeout(() => RNRestart.Restart(), 50);
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LogoFragment />
        <Spacer />
        <Spacer space={20} />
      </View>
      <Button
        text={'الأستمرار باللغة العربية'}
        onPress={() => changeLanguage('ar')}
        style={styles.languageButton}
        textStyle={styles.languageButtonText}
      />
      <Button
        text={'Continue in English'}
        onPress={() => changeLanguage('en')}
        style={styles.languageButton}
        textStyle={styles.languageButtonText}
      />
      <Spacer space={20} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageScreen);
