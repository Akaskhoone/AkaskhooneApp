import PostCard from '@components/PostCard';
import Paginator from '@libs/Paginator';
import React, { Component } from 'react';
import Comment from './CommentCard';

interface Props {
  postId: any;
}
export class SinglePost extends Component<Props> {
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
}

export default SinglePost;
