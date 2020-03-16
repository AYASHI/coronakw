import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import layout from '../utils/layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';
import * as constants from "../utils/constants";




const StatusSelectionView = props => {


  const StatusButton = statusProps => {
    const dividerStyle = statusProps.hasDivider
      ? {
          borderEndWidth: 1,
          borderColor: colors.separatorColor,
        }
      : {};
    const handleTouch = () => {
      props.sendHealthState(statusProps.healthValue);

      //show survey if clicked on not healthy
      if (statusProps.healthValue == constants.UNHEALTHY && !props.isSick) {
        //TODO: probably don't show this on every unhealthy click
        props.healthSurveyShown(true);
      }
    }
    return (
      <View style={[styles.statusContainer, dividerStyle]}>
        <TouchableOpacity
          onPress={handleTouch}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: props.healthState === statusProps.healthValue ? 1 : 0.3
          }}>
          <View style={styles.circle}>
            <Text style={styles.emoji}>{statusProps.emoji}</Text>
          </View>
          <Text style={styles.statusTitle}>{statusProps.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  let array = [
    {title: 'بصحة جيدة', emoji: '😊', hasDivider: true, healthValue: constants.HEALTHY},
    {title: 'بصحة غير جيدة', emoji: '😔', hasDivider: false, healthValue: constants.UNHEALTHY},
  ];

  if (props.isSick) {
    array = [
      {title: 'تحسنت', emoji: '😊', hasDivider: true, healthValue: constants.HEALTHY},
      {title: 'متعب', emoji: '🤒', hasDivider: false, healthValue: constants.UNHEALTHY},
      {title: 'متعب جداً', emoji: '🤧', hasDivider: false, healthValue: constants.SERIOUSLY_UNHEALTHY},
    ];
  }
  const Statuses = () => {
    return (
      <>
        {array.map(item => (
          <StatusButton
            title={item.title}
            emoji={item.emoji}
            hasDivider={item.hasDivider}
            healthValue={item.healthValue}
          />
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Statuses />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: layout.radius,
    backgroundColor: 'white',
    height: 160,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 160,
  },
  circle: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: colors.paleGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 60,
  },
  statusTitle: {
    fontFamily: fonts.Semibold,
    fontSize: 17,
  },
});


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    healthState: state.home.healthState,
    isSick: state.home.isSick
  };
};


// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    sendHealthState: (healthStateValue) => dispatch({
      type: actionTypes.SEND_HEALTH_STATE,
      value: healthStateValue,
    }),
    healthSurveyShown: (show) => dispatch({
      type: actionTypes.HEALTH_SURVEY_SHOWN,
      value: show,
    })
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(StatusSelectionView);