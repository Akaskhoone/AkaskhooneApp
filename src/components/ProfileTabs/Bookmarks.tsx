import React, { Component } from 'react';
import { View } from 'react-native';
import Reactotron from 'reactotron-react-native';
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
        url={`/social/boards/?username=${username}&limit=2`}
        defaultComponent={this.renderDefault}
        renderItem={this.renderItem}
      />
    );
  }
  private renderDefault = () => <View />;
  private renderItem = ({ item, index }) => {
    return <Bookmark boardId={item} username={this.props.username} />;
  };
}
