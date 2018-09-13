import env from '@utils/env.json';
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';

const { width } = Dimensions.get('window');

interface Props {
  post: any;
  columnNum: number;
  index: number;
  onPress: any;
}
export class Post extends Component<Props> {
  public render() {
    const imageMargin = 5;
    const { columnNum, index } = this.props;
    const imageSize = (width - (columnNum + 1) * imageMargin) / columnNum;
    const isMostRight = index % columnNum === columnNum - 1;
    return (
      <TouchableHighlight
        style={{
          marginRight: isMostRight ? 0 : 5,
          marginBottom: 5,
          alignSelf: 'stretch',
          backgroundColor: 'gray'
        }}
        onPress={this.props.onPress}>
        <Image
          source={{ uri: `${env.ASSETS_URL}/${this.props.post.image}` }}
          style={{ width: imageSize, height: imageSize }}
        />
      </TouchableHighlight>
    );
  }
}

export default Post;
