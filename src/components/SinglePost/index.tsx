import { Spinner, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import PostCard from 'src/components/PostCard';
import Comment from './CommentCard';
import CommentTextInput from './CommentTextInput';

interface Props {
  postId: any;
  comments: [any];
  loading: boolean;
  hasNext: boolean;
  load: any;
  reset: any;
}
export class SinglePost extends Component<Props> {
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
      return this.props.load(this.props.postId.post_id);
    }
    return;
  };
  private renderHeader = () => {
    return (
      <PostCard
        onImagePress={this.handleImagePress}
        onProfilePress={this.handleProfilePress}
        dataId={this.props.postId}
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
  loading: false,
  comments: [],
  hasNext: false
});
const mapDispatchToProps = dispatch => ({
  load: () => {
    // return dispatch(loadAction(id)).catch(e => {
    //   Toast.show({ text: I18n.t('unknownError') });
    // }),
  },
  reset: id => {
    // return dispatch(resetAction(id))
  }
});

export default connect<{}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
