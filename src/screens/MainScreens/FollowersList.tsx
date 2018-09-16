import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Left, Right } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ProfileListItem from 'src/components/ProfileListItem';
import Paginator from 'src/libs/Paginator';
import NavigationService from 'src/utils/NavigationService';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

class ProfileList extends Component<Props> {
  public render() {
    const username = this.props.navigation.getParam('username');
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body />
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <MyIcon name="back" size={26} color="#fff" />
            </Button>
          </Right>
        </Header>
        <Paginator
          name={`${username}_followers`}
          type="profiles"
          url={`/accounts/profile/followers/?username=${username}`}
          defaultComponent={this.renderDefaultComponent}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }

  private goBack = () => NavigationService.goBack();
  private renderDefaultComponent = () => <View />;
  private renderItem = ({ item: username }) => <ProfileListItem username={username} />;
}

export default ProfileList;
