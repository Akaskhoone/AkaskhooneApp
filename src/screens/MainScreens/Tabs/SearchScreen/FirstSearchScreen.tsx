import TextField from '@elements/TextField';
import { Container, Header, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';
import { Field } from 'react-redux';
import Paginator from 'src/libs/Paginator/Paginator';
interface Props {
  navigation: any;
  [propName: string]: any;
  tags: string[];
}
const width = Dimensions.get('window').width;
export default class FirstSearchScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header searchBar={true} rounded={true}>
          <Item>
            <TouchableWithoutFeedback onPress={this.navigateTo('secondSearch')}>
              <Text style={{ color: 'gray' }}>جستجوی عکس یا کاربر </Text>
            </TouchableWithoutFeedback>
          </Item>
        </Header>
        <View>
          <Paginator
            defaultComponent={this.defaultComponent}
            name="trendTags"
            type="tags"
            url="/social/tags/"
            renderItem={this.renderItem}
            numColumns={2}
          />
        </View>
      </Container>
    );
  }
  private defaultComponent = () => {
    return <View />;
  };
  private navigateTo = (name, param?) => () => this.props.navigation.navigate(name, param);
  private renderItem = ({ item, index }) => {
    const imageMargin = 5;
    const columnNum = 2;
    const imageSize = (width - (columnNum + 1) * imageMargin) / columnNum;
    const isMostRight = index % columnNum === columnNum - 1;
    const tagName = item;
    return (
      <TouchableNativeFeedback onPress={this.navigateTo('tag', { tagId: tagName })}>
        <View
          style={{
            width: imageSize,
            height: imageSize,
            marginRight: isMostRight ? 0 : 5,
            marginBottom: 5,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text>{tagName}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
}
