import I18n from '@utils/i18n';
import { Button, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { ProfileDTO } from 'src/utils/interfaces';
interface OwnProps {
  username: string;
}
interface StateProps {
  profile: ProfileDTO;
  isOwner: boolean;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;
class ProfileListItem extends Component<Props> {
  public render() {
    const { profile } = this.props;
    // profile.
    return (
      <View style={{ flexDirection: 'row-reverse' }}>
        <Thumbnail source={{ uri: profile.image }} />
        <View style={{ flexDirection: 'column' }}>
          <Text>{profile.username}</Text>
          <Text>{profile.name}</Text>
        </View>
        {this.props.isOwner ? (
          <View style={{ flexDirection: 'row' }}>
            <Button
              primary={!profile.is_followed}
              transparent={profile.is_followed}
              bordered={profile.is_followed}
              block={true}
              style={{ width: '50%', borderRadius: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {profile.is_followed ? I18n.t('followed') : I18n.t('notFollowed')}
              </Text>
            </Button>
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  return {
    profile: selectors.profiles.getData(state, ownProps.username),
    isOwner: selectors.getOwner(state).username === ownProps.username
  };
};
export default connect(mapStateToProps)(ProfileListItem);
