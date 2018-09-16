import ImageItem from '@elements/ImageItem';
import Paginator from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { PostDTO } from '@utils/interfaces';
import NavigationService from '@utils/NavigationService';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';

interface OwnProps {
  username: any;
}
interface StateProps {
  getPost: (string) => PostDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;
class Posts extends Component<Props> {
  public render() {
    const username = this.props.username;
    return (
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Paginator
          type="posts"
          name={`${username}_posts`}
          url={`/social/posts/?username=${username}&limit=10`}
          renderItem={this.renderItem}
          defaultComponent={this.renderDefaultComponent}
          numColumns={2}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
  private renderDefaultComponent = () => (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 16,
          color: 'gray',
          textAlign: 'center',
          marginHorizontal: scale(15)
        }}>
        {I18n.t('noPosts')}
      </Text>
    </View>
  );
  // private renderItem = ({ item, index }) => <Post postId={item} index={index} columnNum={2} />;
  private renderItem = ({ item: postId, index }) => {
    const post = this.props.getPost(postId);
    return (
      <ImageItem
        imageExtractor={this.imageExtractor}
        item={post}
        index={index}
        imagesPerRow={2}
        onPress={this.handlePress}
      />
    );
  };
  private imageExtractor = post => ({ uri: post.image });
  private handlePress = post => NavigationService.navigateToPost(post.id);
}

const mapStateToProps = (state): StateProps => ({
  getPost: postId => selectors.posts.getData(state, postId)
});
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(Posts);
