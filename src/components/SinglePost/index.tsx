import { load as loadAction, reset as resetAction } from '@actions/commentActions';
import I18n from '@utils/i18n';
import { Spinner, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { PostCard } from 'src/components/PostCard';
import { selectors } from 'src/reducers';
import Comment from './CommentCard';
import CommentTextInput from './CommentTextInput';

interface Props {
  post: any;
  comments: [any];
  loading: boolean;
  hasNext: boolean;
  load: any;
  reset: any;
}
export class SinglePost extends Component<Props> {
  public componentDidMount() {
    if (!this.props.loading) {
      const postId = this.props.post.post_id;
      this.props.reset(postId);
      this.props.load(postId);
    }
  }
  public render() {
    const { comments } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={comments}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          onEndReached={this.loadMoreHandler}
        />
      </View>
    );
  }
  private loadMoreHandler = () => {
    if (this.props.hasNext && !this.props.loading) {
      return this.props.load(this.props.post.post_id);
    }
    return;
  };
  private renderHeader = () => {
    return (
      <PostCard
        onImagePress={this.handleImagePress}
        onProfilePress={this.handleProfilePress}
        data={this.props.post}
      />
    );
  };
  private renderItem = ({ item }) => {
    return <Comment data={item} />;
  };
  private renderFooter = () => {
    return (
      <View>
        {this.props.loading && <Spinner />}
        <CommentTextInput />
      </View>
    );
  };
  private handleImagePress = () => {
    Reactotron.log('Image pressed');
  };
  private handleProfilePress = () => {
    Reactotron.log('Profile pressed');
  };
}

const mapStateToProps = (state, props) => ({
  loading: selectors.isFetchingComments(state, props.post.post_id),
  comments: selectors.getComments(state, props.post.post_id),
  hasNext: selectors.hasCommentsNextPage(state, props.post.post_d)
});
const mapDispatchToProps = dispatch => ({
  load: id =>
    dispatch(loadAction(id)).catch(e => {
      Toast.show({ text: I18n.t('unknownError') });
    }),
  reset: id => dispatch(resetAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
