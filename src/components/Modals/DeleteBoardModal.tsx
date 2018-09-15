import { Text } from 'native-base';
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import I18n from 'src/utils/i18n';

export default ({ visible, onYesPress, onNoPress, onRequestClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalBg}>
        <View style={styles.container}>
          <View style={styles.desContainer}>
            <Text style={{ fontSize: 10 }}>{I18n.t('deleteBoard')}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableNativeFeedback style={styles.buttonContainer} onPress={onNoPress}>
              <View style={[styles.buttonContainer, { borderRightWidth: 1 }]}>
                <Text>{I18n.t('no')}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={onYesPress}>
              <View style={styles.buttonContainer}>
                <Text>{I18n.t('delete')}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    width: '100%',
    height: 110,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  desContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  desText: {},
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EFEFEF'
  },
  buttonText: {}
});
