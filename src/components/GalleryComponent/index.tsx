import { CameraRollGallery } from '@elements/CameraRollGallery';
import { Text, View } from 'native-base';
import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import Reactotron from 'reactotron-react-native';
import I18n from 'src/utils/i18n';

interface Props {
  onChange: Function;
  value: string;
  [propName: string]: any;
}
export default class GalleryComponent extends Component<Props> {
  public gallery = undefined;

  public render() {
    return (
      <View style={{ flex: 1, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        {/* <CameraRollPicker
          callback={this.getSelectedImage}
          selectSingleItem={true}
          backgroufColor={'gray'}
        /> */}
        <CameraRollGallery
          selected={this.getSelectedImage()}
          EmptyComponent={this.renderEmpty}
          callback={this.handleImagePress}
        />
      </View>
    );
  }

  private handleImagePress = (selected, image) => {
    this.props.onChange(image.uri);
  };

  private renderEmpty = () => <Text>No images to show</Text>;
  private getSelectedImage = () => (this.props.value ? [this.props.value] : undefined);

  private setUri = event => {
    // CropedPic.openCropper({ path: event.nativeEvent.selected });
    // this.props.onChange(event.nativeEvent.selected);
  };
}
