import MyIcon from '@elements/Icon';
import { Button } from 'native-base';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Reactotron from 'reactotron-react-native';

interface Props {
  [name: string]: any;
}
const { width, height } = Dimensions.get('window');

class AddPostButton extends Component<Props> {
  public render() {
    const buttonSize = width / 5.5;
    return (
      <Button
        {...this.props}
        style={{
          position: 'absolute',
          bottom: 13,
          width: buttonSize,
          height: buttonSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: buttonSize / 2,
          alignSelf: 'center'
        }}
      >
        <MyIcon color="white" name="add" size={32} />
      </Button>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
}

export default AddPostButton;
