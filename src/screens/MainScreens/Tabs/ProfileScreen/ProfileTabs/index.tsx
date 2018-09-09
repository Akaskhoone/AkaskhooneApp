import { Content, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import I18n from 'src/utils/i18n';
import Bookmarks from './Bookmarks';
import Posts from './Posts';

export default class ProfileScreen extends Component {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs locked={true}>
          <Tab heading={I18n.t('bookmarks')}>
            <Content>
              <Bookmarks />
            </Content>
          </Tab>
          <Tab heading={I18n.t('photos')}>
            <Content>
              <Posts />
            </Content>
          </Tab>
        </Tabs>
      </View>
    );
  }
}
