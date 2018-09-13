import { getActionsFor } from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { Spinner, Toast } from 'native-base';
import React, { Component, ReactElement } from 'react';
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

export class Paginator extends Component<Props> {
  public componentDidMount() {
    this.props.dispatch.load();
  }
  public render() {
    Reactotron.log('Paginator Props', this.props);
    const { state, dispatch, name, type, url, ...otherProps } = this.props;
    const DefaultComponent = this.props.defaultComponent;

    const keyExtractor = a => `${a}`;

    if (state.hasData) {
      return (
        <FlatList
          {...otherProps}
          data={state.data}
          renderItem={this.renderItem}
          refreshControl={<RefreshControl refreshing={state.loading} onRefresh={dispatch.load} />}
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
        refreshControl={<RefreshControl onRefresh={dispatch.load} refreshing={state.loading} />}>
        <DefaultComponent />
      </ScrollView>
    );
  }

  private renderFooter = () => {
    return this.props.state.loadingMore ? <Spinner /> : null;
  };
  private renderItem = renderItemInfo => {
    Reactotron.log('Render item info', renderItemInfo);
    return this.props.renderItem({
      ...renderItemInfo,
      item: this.props.state.getItem(renderItemInfo.item)
    });
  };
  private loadMore = () => {
    if (this.props.state.hasNext && !this.props.state.loadingMore) {
      return this.props.dispatch.loadMore();
    }
    return;
  };
}

const mapStateToProps = (state, ownProps: Props) => {
  const dataType = ownProps.type;
  const paginationName = ownProps.name;
  const dataSelectors = selectors[dataType];
  const pagination = dataSelectors.pagination(state, paginationName);
  return {
    state: {
      getItem: dataId => dataSelectors.getData(state, dataId),
      data: pagination.getData(),
      loading: pagination.isLoading(),
      loadingMore: pagination.isLoadingMore(),
      hasNext: pagination.hasNext(),
      hasData: pagination.hasData()
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const dataType = ownProps.type;
  const paginationName = ownProps.name;
  const paginationEndpoint = ownProps.url;
  const postActions = getActionsFor(dataType);
  const feedPagination = postActions.createPagination(paginationName, paginationEndpoint);
  return {
    dispatch: {
      load: () =>
        dispatch(feedPagination.load()).catch(() => Toast.show({ text: I18n.t('unknownError') })),
      loadMore: () =>
        dispatch(feedPagination.loadMore()).catch(() =>
          Toast.show({ text: I18n.t('unknownError') })
        )
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
