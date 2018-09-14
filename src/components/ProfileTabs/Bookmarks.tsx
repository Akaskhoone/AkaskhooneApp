import React, { Component } from 'react';
import { View } from 'react-native';
import Paginator from 'src/libs/Paginator';
import Bookmark from './Bookmark';

interface Props {
  username: string;
}
export default class Bookmarks extends Component<Props> {
  public render() {
    const { username } = this.props;
    return (
      <Paginator
        name={`${username}_boards`}
        type="boards"
        url={`/social/boards/?username=${username}`}
        defaultComponent={this.renderDefault}
        renderItem={this.renderItem}
      />
    );
  }
  private renderDefault = () => <View />;
  private renderItem = ({ item, index }) => <Bookmark boardId={item} />;
}
