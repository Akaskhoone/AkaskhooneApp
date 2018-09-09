import AutoHeightImageWithProgress from '@elements/AutoHeightImageWithProgress';
import Button from '@elements/DoubleTapableButton';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import env from '@utils/env';
const { width: windowWidth } = Dimensions.get('window');

interface Props {
  imageUrl: string;
  onPress: any;
}
export default class PostImage extends Component<Props> {
  public render() {
    return (
      <Button onPress={this.props.onPress}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AutoHeightImageWithProgress
            source={`${env.ASSETS_URL}/${this.props.imageUrl}`}
            width={windowWidth}
          />
        </View>
      </Button>
    );
  }
}
