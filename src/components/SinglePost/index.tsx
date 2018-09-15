import PostCard from '@components/PostCard';
import Paginator, { getActionsFor } from '@libs/Paginator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { destroy } from 'redux-form';
import CommentTextInput from 'src/components/SinglePost/CommentTextInput';
import Comment from './CommentCard';

interface OwnProps {
  postId: string;
}
interface StateProps {}
interface DispatchProps {
  submitComment: (string) => Promise<void>;
  destroyComment: () => void;
}
type Props = OwnProps & StateProps & DispatchProps;
class SinglePost extends Component<Props> {
  public render() {
    Reactotron.log('Post Component opened with postID:', this.props.postId);
    const { postId } = this.props;
    return (
      <Paginator
        defaultComponent={this.renderDefaultComponent}
        name={`post${postId}_comments`}
        type="comments"
        url={`/social/posts/${postId}/comments/`}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
  private renderDefaultComponent = () => {
    return this.renderHeader();
  };
  private renderHeader = () => {
    return <PostCard postId={this.props.postId} />;
  };
  private renderItem = ({ item }) => {
    return <Comment commentId={item} />;
  };
  private renderFooter = () => <CommentTextInput onSubmit={this.submitComment} />;
  private submitComment = vals => {
    this.props.submitComment(vals.commentText).then(() => this.props.destroyComment());
  };
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
  const commentEndpoint = getActionsFor('comments').createEndpoint(
    `/social/posts/${ownProps.postId}/comments/`
  );
  return {
    submitComment: text => dispatch(commentEndpoint.createItem({ text })),
    destroyComment: () => dispatch(destroy('comment'))
  };
};
export default connect<StateProps, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(SinglePost);
