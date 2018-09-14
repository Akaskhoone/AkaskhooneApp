import { Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import { PostDTO } from 'src/utils/interfaces';
import NavigationService from 'src/utils/NavigationService';
import Caption from './PostCaption';
import Footer from './PostFooter';
import Header from './PostHeader';
import Image from './PostImage';

const windowWidth = Dimensions.get('window').width;

interface OwnProps {
  postId: string;
}
interface StateProps {
  post: PostDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

export class PostCard extends Component<Props> {
  public render() {
    const post = this.props.post;
    return (
      <Card>
        <CardItem>
          <Header location={post.location} date={post.date} creatorUsername={post.creator} />
        </CardItem>
        <CardItem cardBody={true}>
          <Image imageUrl={post.image} onPress={this.navigateToPost} />
          {/* <TouchableWithoutFeedback onPress={this.navigateToPost}> */}
          {/* <Image source={{ uri: post.image, width: windowWidth, height: windowWidth }} /> */}
          {/* </TouchableWithoutFeedback> */}
        </CardItem>
        <CardItem>
          <Caption
            description={post.des}
            tags={post.tags.reduce((p, t) => `${p} #${t}`, '').trim()}
          />
        </CardItem>
        <CardItem>
          <Footer likesCount={post.likes_count} commentsCount={post.comments_count} />
        </CardItem>
      </Card>
    );
  }
  private navigateToPost = () => {
    NavigationService.navigateToPost(this.props.postId);
  };
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  return { post: selectors.posts.getData(state, ownProps.postId) };
};
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(PostCard);
