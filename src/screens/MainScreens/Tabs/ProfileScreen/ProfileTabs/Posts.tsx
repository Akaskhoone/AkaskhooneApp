import images from '@assets/images/feed_images';
import { Col, Content, Grid, Row } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, View } from 'react-native';
import Bookmarks from './Bookmark';

const { width, height } = Dimensions.get('window');

interface Props {
  data: any;
}
export default class Posts extends Component<Props> {
  // public render() {
  // return <FlatList data={this.props.data} renderItem={this.renderItem} />;
  // }
  // private renderItem = ({ item, index }) => <Bookmark />;
}
