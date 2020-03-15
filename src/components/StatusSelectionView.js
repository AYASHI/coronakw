import React, { useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import layout from '../utils/layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';


const StatusSelectionView = props => {


  const StatusButton = statusProps => {
    console.log("props", props);

    const dividerStyle = statusProps.hasDivider
      ? {
          borderEndWidth: 1,
          borderColor: colors.separatorColor,
        }
      : {};
    const handleTouch = () => {
      props.sendHealthState(statusProps.healthValue);
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

  const array = [
    {title: 'بصحة جيدة', emoji: '😊', hasDivider: true, healthValue: 1},
    {title: 'بصحة غير جيدة', emoji: '😔', hasDivider: false, healthValue: 2},
  ];

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
  };
};


// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    sendHealthState: (healthStateValue) => dispatch({
      type: actionTypes.SEND_HEALTH_STATE,
      value: healthStateValue,
    })
  };
};
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(StatusSelectionView);