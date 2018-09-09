import { Toast } from 'native-base';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { load, loadMore } from 'src/actions/postsActions';
import { selectors } from 'src/reducers';
import I18n from 'src/utils/i18n';
import PostCard from '../PostCard';
import Scroller from './Scroller';

export const Feed = props => {
  const DefaultComponent = props.defaultComponent;
  if (props.hasFeedPosts) {
    return (
      <Scroller
        {...props}
        Item={PostCard}
        showSinglePost={props.showSinglePost}
        showProfile={props.showProfile}
      />
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={<RefreshControl onRefresh={props.load} refreshing={props.loading} />}>
      <DefaultComponent />
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.feed.posts,
  loading: state.posts.feed.loading,
  loadingMore: state.posts.feed.loadingMore,
  hasNext: selectors.hasFeedNext(state),
  hasFeedPosts: selectors.hasFeedPosts(state)
});
const mapDispatchToProps = dispatch => ({
  load: () => dispatch(load()).catch(() => Toast.show({ text: I18n.t('unknownError') })),
  loadMore: () => dispatch(loadMore()).catch(() => Toast.show({ text: I18n.t('unknownError') }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
