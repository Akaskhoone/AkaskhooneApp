import { Content, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import I18n from 'src/utils/i18n';
import Bookmark from './Bookmark';
import Posts from './Posts';

const { width } = Dimensions.get('window');

interface Props {
  bookmarks: any;
  posts: any;
}
export default class ProfileScreen extends Component<Props> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs locked={true}>
          <Tab heading={I18n.t('bookmarks')}>
            <Content>
              <FlatList data={this.props.bookmarks} renderItem={this.renderBookmark} />
            </Content>
          </Tab>
          <Tab heading={I18n.t('photos')}>
            <Content>
              <FlatList data={this.props.posts} renderItem={this.renderPost} />
            </Content>
          </Tab>
        </Tabs>
      </View>
    );
  }

  private renderPost = ({ item, index }) => (
    <View
      key={index}
      style={{
        width: width / 3,
        height: width / 3,
        marginBottom: 2,
        paddingLeft: index % 3 !== 0 ? 2 : 0
      }}>
      <Image
        source={item.image}
        style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined }}
      />
    </View>
  );

  private renderBookmark = ({ item, index }) => <Bookmark />;
}
