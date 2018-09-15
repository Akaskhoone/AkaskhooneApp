import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import Connect from 'react-redux';

interface Props {
  tagName: string;
}
export default class HashtagListItem extends Component<Props> {
  public render() {
    return (
      <View style={{ flexDirection: 'row-reverse' }}>
        {/* <Thumbnail style={{ height: 100, width: 100 }} /> */}
        <View style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text>{this.props.tagName}</Text>
      </View>
    );
  }
}
