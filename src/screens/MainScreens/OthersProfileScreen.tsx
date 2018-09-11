import { loadOthersProfile } from '@actions/profileActions';
import ProfileComponent from '@components/ProfileComponent';
import MyIcon from '@elements/Icon';
import { selectors } from '@reducers/index';
import ProfileTabs from '@screens/MainScreens/Tabs/ProfileScreen/ProfileTabs';
import { Body, Button, Container, Content, Header, Icon, Left, Right } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

interface Props {
  navigation: any;
  loading: boolean;
  data: {
    name: string;
    bio: string;
    followers: number;
    followings: number;
    image: string;
    username: string;
  };
  isFollowed: boolean;
  username: string;
  loadOthersProfile: Function;
}
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
          loadProfile={this.loadOthersProfile}
        />
        {/* <ProfileTabs /> */}
      </Container>
    );
  }
  private goBack = () => {
    this.props.navigation.goBack();
  };
  private loadOthersProfile = () => {
    const username = this.props.navigation.state.params.username;
    return this.props.loadOthersProfile(username);
  };
}

const mapStateToProps = (state, props) => {
  const username = props.navigation.state.params.username;
  return {
    loading: selectors.isFetchingProfile(state, username),
    data: selectors.getProfile(state, username),
    isFollowed: selectors.isFollowed(state, username)
  };
};
const mapDispatchToProps = dispatch => ({
  loadOthersProfile: username => dispatch(loadOthersProfile(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OthersProfileScreen);
