import { loadOwnProfile } from '@actions/profileActions';
import ProfileComponent from '@components/ProfileComponent';
import ProfileTabs from '@components/ProfileTabs';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Left, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {
  username: string;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

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
        <ProfileComponent username={this.props.username} />
        <ProfileTabs username={this.props.username} />
      </Container>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
}

const mapStateToProp = (state): StateProps => ({
  username: selectors.getOwner(state).username
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
  loadOwnProfile: () => dispatch(loadOwnProfile())
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProp,
  mapDispatchToProps
)(ProfileScreen);
