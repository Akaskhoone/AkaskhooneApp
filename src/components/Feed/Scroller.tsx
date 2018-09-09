import { Spinner, Toast } from 'native-base';
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import I18n from 'src/utils/i18n';

interface Props {
  posts: Object[];
  loading: boolean;
  loadingMore: boolean;
  hasNext: boolean;
  Item: any;
  load: any;
  loadMore: any;
  defaultComponent: any;
  showSinglePost: any;
  showProfile: any;
}

export default (props: Props) => {
  const keyExtractor = item => `${item.post_id}`;
  const renderItem = ({ item }) => {
    const Item = props.Item;
    return (
      <Item
        data={item}
        onImagePress={handleImagePress(item)}
        onProfilePress={handleProfilePress(item)}
      />
    );
  };
  const renderFooter = () => {
    return props.loadingMore ? <Spinner /> : null;
  };
  const loadMore = () => {
    if (props.hasNext && !props.loadingMore) {
      return props.loadMore().catch(e => Toast.show({ text: I18n.t('unknownError') }));
    }
    return;
  };
  const handleImagePress = item => () => {
    props.showSinglePost({
      item
    });
  };
  const handleProfilePress = item => () => {
    props.showProfile({
      username: item.creator
    });
  };

  return (
    <FlatList
      data={props.posts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={props.loading} onRefresh={props.load} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
    />
  );
};
