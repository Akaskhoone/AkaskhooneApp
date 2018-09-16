import AddToBoardModal from '@components/modals/AddToBoardModal';
import { Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getActionsFor } from 'src/libs/Paginator';
import { selectors } from 'src/reducers';
import { PostDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';
import Caption from './PostCaption';
import Footer from './PostFooter';
import Header from './PostHeader';
import Image from './PostImage';

interface OwnProps {
  postId: string;
}
interface StateProps {
  post: PostDTO;
}
interface DispatchProps {
  loadPost: () => void;
  likePost: () => void;
  dislikePost: () => void;
}
interface State {
  bookmarkModalVisible: boolean;
}
type Props = OwnProps & StateProps & DispatchProps;

export class PostCard extends Component<Props, State> {
  public state = {
    bookmarkModalVisible: false
  };
  public componentDidMount() {
    this.props.loadPost();
  }
  public render() {
    const post = this.props.post;
    return (
      <View>
        <Card>
          <CardItem>
            <Header location={post.location} date={post.date} creatorUsername={post.creator} />
          </CardItem>
          <CardItem cardBody={true}>
            <Image
              imageUrl={post.image}
              onPress={this.navigateToPost}
              onDoubleTap={this.props.likePost}
            />
          </CardItem>
          <CardItem>
            <Caption
              description={post.des}
              tags={post.tags.reduce((p, t) => `${p} #${t}`, '').trim()}
            />
          </CardItem>
          <CardItem>
            <Footer
              like={this.props.likePost}
              dislike={this.props.dislikePost}
              bookmark={this.onBookmarkPress}
              likesCount={post.likes_count}
              commentsCount={post.comments_count}
              isLiked={post.is_liked}
              navigateToPost={this.navigateToPost}
            />
          </CardItem>
        </Card>
        <AddToBoardModal
          onRequestClose={this.closeBookmarkModal}
          postId={this.props.postId}
          visible={this.state.bookmarkModalVisible}
        />
      </View>
    );
  }
  private navigateToPost = () => {
    NavigationService.navigateToPost(this.props.postId);
  };
  private openBookmarkModal = () => this.setState({ bookmarkModalVisible: true });
  private closeBookmarkModal = () => this.setState({ bookmarkModalVisible: false });
  private onBookmarkPress = () => this.openBookmarkModal();
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  return { post: selectors.posts.getData(state, ownProps.postId) };
};
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const postEndpoint = getActionsFor('posts').createEndpoint('/social/posts/');
  return {
    loadPost: () => {
      dispatch(postEndpoint.loadItem(`${ownProps.postId}/`));
    },
    likePost: () =>
      dispatch(postEndpoint.updateItem(`${ownProps.postId}/likes/`, { method: 'like' })),
    dislikePost: () =>
      dispatch(postEndpoint.updateItem(`${ownProps.postId}/likes/`, { method: 'dislike' }))
  };
};
export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(PostCard);
