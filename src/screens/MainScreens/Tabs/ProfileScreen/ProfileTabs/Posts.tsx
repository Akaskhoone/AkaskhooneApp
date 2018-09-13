import I18n from '@utils/i18n';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Paginator from 'src/libs/Paginator';
import Post from './Post';

interface Props {
  username: any;
  navigateToPost: any;
}
export default class Posts extends Component<Props> {
  public render() {
    const username = this.props.username;
    return (
      <Paginator
        type="posts"
        name={`${username}_posts`}
        url={`/social/posts/?username=${username}`}
        renderItem={this.renderItem}
        defaultComponent={this.renderDefaultComponent}
        numColumns={2}
        contentContainerStyle={{ marginLeft: 5 }}
      />
    );
  }
  private renderDefaultComponent = () => (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 16,
          color: 'gray',
          textAlign: 'center',
          marginHorizontal: scale(15)
        }}>
        {I18n.t('noPosts')}
      </Text>
    </View>
  );
  private renderItem = ({ item, index }) => (
    <Post dataId={item} index={index} columnNum={2} onPress={this.handlePress({ item })} />
  );
  private handlePress = item => () => {
    this.props.navigateToPost(item);
  };
}
