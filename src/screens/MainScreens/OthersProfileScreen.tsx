import ProfileComponent from '@components/ProfileComponent';
import ProfileTabs from '@components/ProfileTabs';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Icon, Left, Right } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export default class OthersProfileScreen extends Component<Props> {
  public render() {
    const username = this.props.navigation.getParam('username');
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true}>
              <Icon type="Entypo" name="dots-three-horizontal" />
            </Button>
          </Left>
          <Body>
            <Button transparent={true} />
          </Body>
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <MyIcon name="back" color="white" size={24} />
            </Button>
          </Right>
        </Header>
        <ProfileComponent username={username} isOthers={true} />
        <ProfileTabs username={username} />
      </Container>
    );
  }
  private goBack = () => {
    this.props.navigation.goBack();
  };
}
