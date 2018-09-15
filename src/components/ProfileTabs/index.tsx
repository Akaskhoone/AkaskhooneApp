import { Content, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Bookmarks from 'src/components/ProfileTabs/Bookmarks';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';
import { ProfileDTO } from 'src/utils/interfaces';
import Bookmark from './Bookmark';
import Posts from './Posts';

interface OwnProps {
  username: string;
}
interface StateProps {
  profile: ProfileDTO;
  isOwner: boolean;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

class ProfileTabs extends Component<Props> {
  public render() {
    const {
      profile: { is_private, is_followed },
      isOwner
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Tabs locked={true}>
          <Tab heading={I18n.t('bookmarks')}>
            {!is_private || is_followed || isOwner ? (
              <Bookmarks username={this.props.username} />
            ) : null}
          </Tab>
          <Tab heading={I18n.t('photos')}>
            {!is_private || is_followed || isOwner ? (
              <Posts username={this.props.username} />
            ) : null}
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => ({
  profile: selectors.profiles.getData(state, ownProps.username),
  isOwner: selectors.isOwner(state, ownProps.username)
});
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(ProfileTabs);
