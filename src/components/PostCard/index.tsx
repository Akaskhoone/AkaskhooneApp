import { Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import Caption from './PostCaption';
import Footer from './PostFooter';
import Header from './PostHeader';
import Image from './PostImage';

interface Props {
  post: any;
  onImagePress: any;
  onProfilePress: any;
}
export class PostCard extends Component<Props> {
  public render() {
    const post = this.props.post;
    return (
      <Card>
        <CardItem>
          <Header
            location={post.location}
            creator={post.creator}
            date={post.date}
            profileUrl={post.profileUrl}
            showProfile={this.props.onProfilePress}
          />
        </CardItem>
        <CardItem cardBody={true}>
          <Image imageUrl={post.image} onPress={this.props.onImagePress} />
        </CardItem>
        <CardItem>
          <Caption
            description={post.des}
            tags={post.tags.reduce((p, t) => `${p} #${t}`, '').trim()}
          />
        </CardItem>
        <CardItem>
          <Footer likes={post.likes} comments={post.comments} liked={post.liked} />
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.dataId;
  return {
    post: selectors.posts.getData(state, postId)
  };
};

export default connect(mapStateToProps)(PostCard);
