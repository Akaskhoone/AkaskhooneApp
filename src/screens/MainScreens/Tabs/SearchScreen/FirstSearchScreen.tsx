import TextField from '@elements/TextField';
import { Container, Header, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Field } from 'react-redux';
interface Props {
  navigation: any;
  [propName: string]: any;
  tags: string[];
}
export default class FirstSearchScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header searchBar={true} rounded={true}>
          <Item onPress={this.navigateTo('secondSearch')}>
            <Text style={{ color: 'gray' }}>جستجوی عکس یا کاربر </Text>
          </Item>
        </Header>
      </Container>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
}
