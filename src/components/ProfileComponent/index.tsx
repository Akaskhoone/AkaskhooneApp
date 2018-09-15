import { getActionsFor } from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { ProfileDTO } from '@utils/interfaces';
import { Button, Spinner, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

interface OwnProps {
  username: string;
}
interface StateProps {
  profile: ProfileDTO;
  profileLoaded: boolean;
  isOwner: boolean;
}
interface DispatchProps {
  loadProfile: () => any;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
}
type Props = OwnProps & StateProps & DispatchProps;

class ProfileComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.loadProfile();
  }

  public render() {
    const { isOwner, profile, profileLoaded } = this.props;
    if (!profileLoaded) return <Spinner />;

    const { bio, image, followers, followings, is_followed, is_private, name } = profile;
    return (
      <View style={styles.wholeView}>
        <View>
          <Thumbnail
            large={true}
            source={{
              uri: image
            }}
          />
        </View>
        <View style={styles.textPartView}>
          {/*props functional 'this nmikhad*/}
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.numOfFriends}>
            <Text style={styles.following}>
              {I18n.t('numOfFollowers', { num: followers || 0 })}
            </Text>
            <Text>{I18n.t('numOfFollowings', { num: followings || 0 })}</Text>
          </View>
          <View>
            <Text numberOfLines={isOwner ? 2 : 5} style={styles.bio}>
              {bio}
            </Text>
          </View>
          {this.renderFollowButton()}
        </View>
      </View>
    );
  }

  private renderFollowButton = () => {
    const {
      isOwner,
      profile: { is_followed, is_private }
    } = this.props;
    if (isOwner) return null;
    let onPress;
    if (is_followed) {
      onPress = () => {
        this.props.unfollow();
      };
    } else {
      onPress = () => {
        this.props.follow();
      };
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button
          primary={!is_followed}
          transparent={is_followed}
          bordered={is_followed}
          block={true}
          style={{ width: '50%', borderRadius: 10 }}
          onPress={onPress}
        >
          <Text style={{ fontSize: 15 }}>
            {is_followed
              ? I18n.t('followed')
              : is_private
                ? I18n.t('request')
                : I18n.t('notFollowed')}
          </Text>
        </Button>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  wholeView: {
    flexDirection: 'row-reverse',
    marginVertical: scale(15),
    marginHorizontal: 10
  },
  textPartView: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: scale(15),
    flex: 2
  },
  nameText: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: scale(5)
  },
  numOfFriends: {
    flexDirection: 'row-reverse',
    marginBottom: scale(5)
  },
  following: {
    marginLeft: scale(15)
  },
  bio: {
    paddingBottom: 3
  }
});

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  profile: selectors.profiles.getData(state, ownProps.username),
  profileLoaded: selectors.profiles.dataLoaded(state, ownProps.username),
  isOwner: selectors.isOwner(state, ownProps.username)
});
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const profileActions = getActionsFor('profiles');
  const profileEndpoint = profileActions.createEndpoint('/accounts/profile/');
  const username = ownProps.username;
  return {
    loadProfile: () => dispatch(profileEndpoint.loadItem(`?username=${username}`)),
    follow: () => dispatch(profileEndpoint.updateItem(`${username}/`, { followed: true })),
    unfollow: () => dispatch(profileEndpoint.updateItem(`${username}/`, { followed: false }))
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
