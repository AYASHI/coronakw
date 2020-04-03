import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import React, {useEffect} from 'react';
import * as actionTypes from '../../store/actionTypes';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {useTranslation} from 'react-i18next';

const withErrorDisplay = Comp => props => {
  const {t} = useTranslation();

  useEffect(() => {
    if (props.isError && !props.isBackgroundCheck) {
      Alert.alert(
        t('common.error'),
        props.errorMessage,
        [
          {
            text: t('common.ok'),
            onPress: () => {
              props.hideError();
            },
            style: t('common.cancel'),
          },
        ],
        {cancelable: false},
      );
    }
  }, [props.isError]);

  return (
    <View style={{flex: 1}}>
      <Comp {...props} />
    </View>
  );
};

const mapErrorStateToProps1 = state => {
  return {
    isError: state.core.isError ?? null,
    errorMessage: state.core.errorMessage,
    isBackgroundCheck: state.core.isBackgroundCheck ?? false,
  };
};

const mapDispatchToProps1 = dispatch => {
  return bindActionCreators(
    {
      hideError: ActionCreators.hideError,
      setAsBackgroundCheck: ActionCreators.setAsBackgroundCheck,
    },
    dispatch,
  );
};

const WithErrorDisplay = component => {
  return connect(
    mapErrorStateToProps1,
    mapDispatchToProps1,
  )(withErrorDisplay(component));
};

export default WithErrorDisplay;
