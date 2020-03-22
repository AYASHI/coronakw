import React from 'react';

import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';

export default (LoadingHUD = props => {
  const loading = props.isLoading || false;
  return (
    <Modal
      animationType="fade"
      transparent
      visible={loading}
      onRequestClose={() => null}>
      <View style={styles.modal}>
        <View style={[styles.hudStyle, styles.commonShadow]}>
          <ActivityIndicator animating size="large" color="grey" />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  hudStyle: {
    borderRadius: 5,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  commonShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 4,
  }
});
