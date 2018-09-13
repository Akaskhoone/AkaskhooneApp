import { Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import NavigationService from 'src/utils/NavigationService';
import Caption from './PostCaption';
import Footer from './PostFooter';
import Header from './PostHeader';
import Image from './PostImage';

interface OwnProps {
  postId: string;
}
interface StateProps {
  post: any;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

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
            showProfile={this.navigateToProfile}
          />
        </CardItem>
        <CardItem cardBody={true}>
          <Image imageUrl={post.image} onPress={this.navigateToPost} />
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
  private navigateToProfile = () => {
    NavigationService.navigate('profile', { profileId: this.props.post.creator });
  };
  private navigateToPost = () => {
    NavigationService.navigate('post', { postId: this.props.postId });
  };
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  return { post: selectors.posts.getData(state, ownProps.postId) };
};
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(PostCard);
