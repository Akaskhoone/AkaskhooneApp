import { getActionsFor } from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { Spinner, Toast } from 'native-base';
import React, { Component, ReactElement } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';

interface Props {
  defaultComponent: any;
  type: string;
  name: string;
  url: string;
  renderItem: (info: ListRenderItemInfo<string>) => ReactElement<any>;
  [propName: string]: any;
}

export class Paginator extends Component<Props> {
  public componentDidMount() {
    this.props.load();
  }
  public render() {
    const DefaultComponent = this.props.defaultComponent;

    const keyExtractor = a => `${a}`;

    if (this.props.hasData) {
      return (
        <FlatList
          {...this.props}
          data={this.props.data}
          renderItem={this.props.renderItem}
          refreshControl={
            <RefreshControl refreshing={this.props.loading} onRefresh={this.props.load} />
          }
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.6}
          ListFooterComponent={this.renderFooter}
          keyExtractor={keyExtractor}
        />
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl onRefresh={this.props.load} refreshing={this.props.loading} />
        }>
        <DefaultComponent />
      </ScrollView>
    );
  }

  private renderFooter = () => {
    return this.props.loadingMore ? <Spinner /> : null;
  };

  private loadMore = () => {
    if (this.props.hasNext && !this.props.loadingMore) {
      return this.props.loadMore();
    }
    return;
  };
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
