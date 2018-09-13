import { loadOthersProfile } from '@actions/profileActions';
import ProfileComponent from '@components/ProfileComponent';
import MyIcon from '@elements/Icon';
import { selectors } from '@reducers/index';
import ProfileTabs from '@screens/MainScreens/Tabs/ProfileScreen/ProfileTabs';
import { Body, Button, Container, Content, Header, Icon, Left, Right } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

interface OwnProps {
  navigation: any;
  username: string;
}
interface StateProps {
  loading: boolean;
  isFollowed: boolean;
  data: {
    name: string;
    bio: string;
    followers: number;
    followings: number;
    image: string;
    username: string;
  };
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;
class OthersProfileScreen extends Component<Props> {
  public render() {
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
        <ProfileComponent
          data={this.props.data}
          isFollowed={this.props.isFollowed}
          loading={this.props.loading}
          username={this.props.username}
          isOthers={true}
        />
        {/* <ProfileTabs /> */}
      </Container>
    );
  }
  private goBack = () => {
    this.props.navigation.goBack();
  };
}

const mapStateToProps = (state, props: OwnProps): StateProps => {
  const username = props.navigation.getParam('usrename');
  return {
    loading: false,
    data: {
      name: 'Eddie',
      bio: 'Hi',
      followers: 1,
      followings: 2,
      image: 'string',
      username: 'Eddie'
    },
    isFollowed: false
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(OthersProfileScreen);
