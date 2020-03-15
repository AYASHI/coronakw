import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import layout from '../utils/layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import fonts from '../utils/fonts';

const StatusSelectionView = props => {
  const StatusButton = statusProps => {
    const dividerStyle = statusProps.hasDivider
      ? {
          borderEndWidth: 1,
          borderColor: colors.separatorColor,
        }
      : {};
    return (
      <View style={[styles.statusContainer, dividerStyle]}>
        <TouchableOpacity
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
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
    {title: 'بصحة جيدة', emoji: '😊', hasDivider: true},
    {title: 'بصحة غير جيدة', emoji: '😔', hasDivider: false},
  ];

  const Statuses = () => {
    return (
      <>
        {array.map(item => (
          <StatusButton
            title={item.title}
            emoji={item.emoji}
            hasDivider={item.hasDivider}
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

export default StatusSelectionView;
