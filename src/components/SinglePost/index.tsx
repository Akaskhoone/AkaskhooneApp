import PostCard from '@components/PostCard';
import Paginator from '@libs/Paginator';
import React, { Component } from 'react';
import CommentTextInput from 'src/components/SinglePost/CommentTextInput';
import Comment from './CommentCard';

interface Props {
  postId: any;
}
class SinglePost extends Component<Props> {
  public render() {
    const { postId } = this.props;
    return (
      <Paginator
        defaultComponent={this.renderDefaultComponent}
        name={`post${postId}_comments`}
        type="comments"
        url={`/social/posts/${postId}/comments`}
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
    return <Comment data={item} />;
  };
  private renderFooter = () => <CommentTextInput />;
}

export default SinglePost;
