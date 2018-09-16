import { Container, Header, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
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
          <Item style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={this.navigateTo('secondSearch')}>
              <View>
                <Text style={{ color: 'gray' }}>جستجوی عکس یا کاربر </Text>
              </View>
            </TouchableWithoutFeedback>
          </Item>
        </Header>
        <View style={{ alignItems: 'center' }}>
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

const getRandom = max => Math.ceil(Math.random() * max);
const layout = num => {
  const array = [];
  let temp = 0;
  let input = num;
  while (input >= 1) {
    if (input === 1) {
      temp = 1;
    } else if (input === 2) {
      temp = getRandom(2);
    } else if (input === 3) {
      temp = getRandom(3);
    } else {
      temp = getRandom(4);
    }
    input = input - temp;
    array.push(temp);
  }
  return array;
};
