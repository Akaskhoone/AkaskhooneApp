import images from '@assets/images/feed_images';
import { Col, Content, Grid, Row } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Posts extends Component {
  public render() {
    const postComponents = images.map((image, index) => (
      <View
        key={index}
        style={{
          width: width / 3,
          height: width / 3,
          marginBottom: 2,
          paddingLeft: index % 3 !== 0 ? 2 : 0
        }}>
        <Image
          source={image}
          style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined }}
        />
      </View>
    ));
    return <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>{postComponents}</View>;
  }
}
