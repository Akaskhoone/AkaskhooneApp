import { Header, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { TextInput } from 'react-native';

interface Props {
  [propName: string]: any;
}
export default class SecondeSearchScreen extends Component<Props> {
  public render() {
    return (
      <Header searchBar={true} rounded={true}>
        <Item>
          <Input autoFocus={true} />
        </Item>
      </Header>
    );
  }
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
