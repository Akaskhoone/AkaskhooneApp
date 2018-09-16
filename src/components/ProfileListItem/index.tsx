import I18n from '@utils/i18n';
import { Button, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FollowButton from 'src/components/ProfileComponent/FollowButton';
import { getActionsFor } from 'src/libs/Paginator';
import { selectors } from 'src/reducers';
import { ProfileDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';
interface OwnProps {
  username: string;
}
interface StateProps {
  profile: ProfileDTO;
  isOwner: boolean;
}
interface DispatchProps {
  follow: () => void;
  unfollow: () => void;
}
type Props = OwnProps & StateProps & DispatchProps;
class ProfileListItem extends Component<Props> {
  public render() {
    const { profile } = this.props;
    // profile.
    return (
      <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: 10 }}>
        <TouchableOpacity onPress={this.navigateToProfile} style={{ flexDirection: 'row-reverse' }}>
          <Thumbnail source={{ uri: profile.image }} />
          <View style={{ flexDirection: 'column', marginRight: 15, marginTop: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{profile.username}</Text>
            <Text>{profile.name}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <FollowButton
          isFollowed={profile.is_followed}
          isOwner={this.props.isOwner}
          isPrivate={profile.is_private}
          isRequested={profile.is_requested}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
        />
      </View>
    );
  }
  private navigateToProfile = () => NavigationService.navigateToProfile(this.props.username);
}
const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  return {
    profile: selectors.profiles.getData(state, ownProps.username),
    isOwner: selectors.getOwner(state).username === ownProps.username
  };
};
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const profileActions = getActionsFor('profiles');
  const followingsEndpoint = profileActions.createEndpoint('/accounts/profile/followings/');
  const username = ownProps.username;
  return {
    follow: () => dispatch(followingsEndpoint.createItem({ follow: username })),
    unfollow: () => dispatch(followingsEndpoint.createItem({ unfollow: username }))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileListItem);
