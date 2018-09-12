import { getActionsFor } from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { Spinner, Toast } from 'native-base';
import React, { ReactElement } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

interface Props {
  defaultComponent: any;
  type: string;
  name: string;
  url: string;
  renderItem: (info: ListRenderItemInfo<string>) => ReactElement<any>;
  [propName: string]: any;
}

export const Paginator = (props: Props) => {
  const DefaultComponent = props.defaultComponent;

  const renderFooter = () => {
    return props.loadingMore ? <Spinner /> : null;
  };
  const loadMore = () => {
    if (props.hasNext && !props.loadingMore) {
      return props.loadMore();
    }
    return;
  };
  const keyExtractor = a => a;

  if (props.hasData) {
    return (
      <FlatList
        {...props}
        data={props.data}
        renderItem={props.renderItem}
        refreshControl={<RefreshControl refreshing={props.loading} onRefresh={props.load} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={renderFooter}
        keyExtractor={keyExtractor}
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

const mapStateToProps = (state, ownProps: Props) => {
  const dataType = ownProps.type;
  const paginationName = ownProps.name;
  const pagination = selectors[dataType].pagination(state, paginationName);
  return {
    data: pagination.getData(),
    loading: pagination.isLoading(),
    loadingMore: pagination.isLoadingMore(),
    hasNext: pagination.hasNext(),
    hasData: pagination.hasData()
  };
};
const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const dataType = ownProps.type;
  const paginationName = ownProps.name;
  const paginationEndpoint = ownProps.url;
  const postActions = getActionsFor(dataType);
  const feedPagination = postActions.createPagination(paginationName, paginationEndpoint);
  return {
    load: () =>
      dispatch(feedPagination.load()).catch(() => Toast.show({ text: I18n.t('unknownError') })),
    loadMore: () =>
      dispatch(feedPagination.loadMore()).catch(() => Toast.show({ text: I18n.t('unknownError') }))
  };
};

export default connect<{}, {}, Props>(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
