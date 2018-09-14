import { Content, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import Bookmarks from 'src/components/ProfileTabs/Bookmarks';
import I18n from 'src/utils/i18n';
import Bookmark from './Bookmark';
import Posts from './Posts';

const { width } = Dimensions.get('window');

interface Props {
  username: string;
}
export default class ProfileScreen extends Component<Props> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs locked={true}>
          <Tab heading={I18n.t('bookmarks')}>
            <Bookmarks username={this.props.username} />
          </Tab>
          <Tab heading={I18n.t('photos')}>
            <Posts username={this.props.username} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}
