import images from '@assets/images/feed_images';
import { Card, CardItem, Content, Left, Right, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Reactotron from 'reactotron-react-native';
import I18n from 'src/utils/i18n';

const { width, height } = Dimensions.get('window');

export default class Bookmarks extends Component {
  public render() {
    const thumbnailComponents = images.map((image, index) => (
      <Thumbnail key={index} style={styles.image} square={true} large={true} source={image} />
    ));
    return (
      <Content>
        <Card transparent={true}>
          <CardItem>
            <Left>
              <Text>{I18n.t('allBookmarks')}</Text>
            </Left>
            <Right>
              <Text>{I18n.t('bookmarks')}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody={true}>
            <ScrollView horizontal={true} style={{ flex: 1, height: 100 }}>
              {thumbnailComponents}
            </ScrollView>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    margin: 10
  }
});
