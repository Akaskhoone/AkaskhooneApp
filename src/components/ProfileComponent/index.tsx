import { Button, Spinner, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';
import I18n from 'src/utils/i18n';

interface Props {
  loading: boolean;
  data: {
    name: string;
    bio: string;
    followers: number;
    followings: number;
    image: string;
    username: string;
  };
  username: string;
  isOthers?: boolean;
  isFollowed?: boolean;
  loadProfile: Function;
  [propName: string]: any;
}

export default class ProfileComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    const {
      loading,
      isOthers,
      isFollowed,
      data: { image, name, bio, followers, followings }
    } = this.props;
    Reactotron.log('Profile Image URI', image);
    if (loading) return <Spinner />;
    return (
      <View style={styles.wholeView}>
        <View>
          <Thumbnail
            large={true}
            source={{
              uri: image || 'https://via.placeholder.com/500x500'
            }}
          />
        </View>
        <View style={styles.textPartView}>
          {/*props functional 'this nmikhad*/}
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.numOfFriends}>
            <Text style={styles.following}>{I18n.t('numOfFollowers', { num: followers })}</Text>
            <Text>{I18n.t('numOfFollowings', { num: followings })}</Text>
          </View>
          <View>
            <Text numberOfLines={isOthers ? 5 : 2} style={styles.bio}>
              {bio}
            </Text>
          </View>
          {isOthers ? (
            <View style={{ flexDirection: 'row' }}>
              <Button
                primary={!isFollowed}
                transparent={isFollowed}
                bordered={isFollowed}
                block={true}
                style={{ width: '50%', borderRadius: 10 }}>
                <Text style={{ fontSize: 15 }}>
                  {isFollowed
                    ? I18n.t('statusForFollowedUser')
                    : I18n.t('statusForNotFollowedUser')}
                </Text>
              </Button>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  public componentDidMount() {
    this.loadProfile();
  }

  private loadProfile = () => {
    return this.props.loadProfile(this.props.username);
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
