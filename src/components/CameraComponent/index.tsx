import { Button, View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { CameraKitCamera } from 'react-native-camera-kit';
import ImagePicker from 'react-native-image-crop-picker';
import Reactotron from 'reactotron-react-native';
interface Props {
  onChange: Function;
  value: string;
  [propName: string]: any;
}

export default class CameraComponent extends Component<Props> {
  public camera = undefined;

  public render() {
    if (this.props.value) {
      return (
        <View style={styles.container}>
          <Button style={styles.button} onPress={this.openCamera} />

          <Image
            source={{ uri: this.props.value }}
            style={{
              flex: 1,
              backgroundColor: 'white'
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, this.props.style]}>
          <Button style={styles.button} onPress={this.openCamera} />

          <CameraKitCamera
            ref={cam => (this.camera = cam)}
            style={{
              flex: 1,
              backgroundColor: 'white'
            }}
            cameraOptions={{
              flashMode: 'auto',
              focusMode: 'on',
              zoomMode: 'on',
              ratioOverlay: '1:1',
              ratioOverlayColor: '#00000077'
            }}
          />
        </View>
      );
    }
  }

  private openCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        includeBase64: false,
        mediaType: 'photo',
        cropping: true
      });
      this.props.onChange((result as any).path);
    } catch (e) {
      Reactotron.log('Taking image failed:', e);
    }
  };
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10
  }
});
