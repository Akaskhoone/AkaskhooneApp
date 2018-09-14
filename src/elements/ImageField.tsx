import { ActionSheet, Button, connectStyle, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Reactotron from 'reactotron-react-native';
import I18n from 'src/utils/i18n';

interface Props {
  meta: any;
  input: any;
  style: any;
}
class ImageField extends Component<Props> {
  public render() {
    const { style, meta, ...otherProps } = this.props;
    const imageAddress = this.props.input.value.uri;
    const shouldShowError = meta.error && meta.submitFailed;
    const image = imageAddress
      ? { uri: imageAddress }
      : require('@assets/images/defaultProfile.jpg');
    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Thumbnail large={true} source={image} />
        </TouchableWithoutFeedback>
        {shouldShowError &&
          meta.error.map((e, i) => (
            <Text key={i} danger={true}>
              {I18n.t(e, { name: I18n.t(name) })}
            </Text>
          ))}
      </View>
    );
  }
  private handlePress = () => {
    ActionSheet.show(
      {
        options: [I18n.t('camera'), I18n.t('gallery'), I18n.t('cancel')],
        cancelButtonIndex: 2,
        title: I18n.t('choose')
      },
      this.selectHandler
    );
  };
  private selectHandler = buttonIndex => {
    switch (buttonIndex) {
      case 0:
        ImagePicker.openCamera({
          width: 400,
          height: 400,
          cropping: true,
          mediaType: 'photo',
          includeBase64: false
        })
          .then(this.onChange)
          .catch();
        break;
      case 1:
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
          mediaType: 'photo',
          includeBase64: false
        })
          .then(this.onChange)
          .catch();
        break;
    }
  };
  private onChange = response => {
    this.props.input.onChange({ uri: response.path, type: response.mime, new: true });
  };
}

export default connectStyle('Akaskhoone.ImageField', {})(ImageField);
