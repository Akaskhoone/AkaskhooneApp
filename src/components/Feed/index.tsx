import { getActionsFor } from '@libs/Paginator';
import I18n from '@utils/i18n';
import { Toast } from 'native-base';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { selectors } from 'src/reducers';
import PostCard from '../PostCard';
import Scroller from './Scroller';

export const Feed = props => {
  const DefaultComponent = props.defaultComponent;
  Reactotron.log('Feed props', props);
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

const mapStateToProps = state => {
  const pagination = selectors.posts.pagination(state, 'feed');
  return {
    posts: pagination.getData(),
    loading: pagination.isLoading(),
    loadingMore: pagination.isLoadingMore(),
    hasNext: pagination.hasNext(),
    hasFeedPosts: pagination.hasData()
  };
};
const mapDispatchToProps = dispatch => {
  const postActions = getActionsFor('posts');
  const feedPagination = postActions.createPagination('feed', '/social/home/');
  return {
    load: () =>
      dispatch(feedPagination.load()).catch(() => Toast.show({ text: I18n.t('unknownError') })),
    loadMore: () =>
      dispatch(feedPagination.loadMore()).catch(() => Toast.show({ text: I18n.t('unknownError') }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
