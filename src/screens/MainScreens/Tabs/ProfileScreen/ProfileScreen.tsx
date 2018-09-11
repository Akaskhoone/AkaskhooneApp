import { loadOwnProfile } from '@actions/profileActions';
import ProfileComponent from '@components/ProfileComponent';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Left, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'src/utils/i18n';
import ProfileTabs from './ProfileTabs';

interface Props {
  username: string;
  navigation: any;
  loading: boolean;
  loadOwnProfile: Function;
  data: {
    name: string;
    followers: number;
    followings: number;
    bio: string;
    image: string;
    username: string;
  };
}

class ProfileScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} onPress={this.navigateTo('changeInfo')}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                {I18n.t('edit')}
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ textAlign: 'center' }}>{this.props.username}</Title>
          </Body>

          <Right>
            <Button transparent={true} onPress={this.navigateTo('setting')}>
              <MyIcon name="settings" size={24} color="white" />
            </Button>
          </Right>
        </Header>
        <ProfileComponent
          username={this.props.username}
          data={this.props.data}
          loading={this.props.loading}
          loadProfile={this.props.loadOwnProfile}
        />
        {/* <ProfileTabs /> */}
      </Container>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
}

const mapStateToProp = state => {
  return {
    username: state.auth.ownProfile.username,
    data: state.auth.ownProfile
  };
};
const mapDispatchToProps = () => dispatch => ({
  loadOwnProfile: () => dispatch(loadOwnProfile())
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ProfileScreen);
