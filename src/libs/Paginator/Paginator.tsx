import { getActionsFor } from '@libs/Paginator';
import { selectors } from '@reducers/index';
import I18n from '@utils/i18n';
import { Spinner, Toast } from 'native-base';
import React, { Component, ReactElement } from 'react';
import { FlatList, FlatListProperties, RefreshControl, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface OwnProps extends Omit<FlatListProperties<string>, 'data'> {
  defaultComponent: any;
  type: string;
  name: string;
  url: string;
  dataIsReady?: boolean;
  onDataLoad?: () => void;
}
interface StateProps {
  data: [string];
  loading: boolean;
  loadingMore: boolean;
  hasNext: boolean;
  hasData: boolean;
}
interface DispatchProps {
  load: () => void;
  loadMore: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;
export class Paginator extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    dataIsReady: true,
    onDataLoad: () => {
      // Doing nothing
    }
  };

  public componentDidMount() {
    if (this.props.dataIsReady) this.props.load();
  }
  public componentWillReceiveProps(nextProps) {
    if (nextProps.dataIsReady && !this.props.dataIsReady) this.load();
  }
  public render() {
    Reactotron.log('Paginator Props', this.props);
    const {
      name,
      type,
      url,
      hasData,
      hasNext,
      data,
      load,
      loadMore,
      loading,
      loadingMore,
      defaultComponent: DefaultComponent,
      ...otherProps
    } = this.props;

    const keyExtractor = a => `${a}`;
    if (hasData) {
      return (
        <FlatList
          {...otherProps}
          data={data}
          renderItem={this.props.renderItem}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.load} />}
          onEndReached={this.loadMore}
          ListFooterComponent={this.renderFooter}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
        />
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.load} />}>
          <DefaultComponent />
          {this.renderFooter()}
        </ScrollView>
      );
    }
  }

  private renderItem = input => {
    return this.props.renderItem(input);
  };
  private renderFooter = () => {
    const ListFooterComponent = this.props.ListFooterComponent as any;
    return (
      <View>
        {this.props.loadingMore && <Spinner />}
        {ListFooterComponent && <ListFooterComponent />}
      </View>
    );
  };
  private load = () => {
    this.props.onDataLoad();
    this.props.load();
  };
  private loadMore = () => {
    if (this.props.hasNext && !this.props.loadingMore) {
      return this.props.loadMore();
    }
    return;
  };
}

const mapStateToProps = (state, ownProps: OwnProps): StateProps => {
  const dataType = ownProps.type;
  const paginationName = ownProps.name;
  const dataSelectors = selectors[dataType];
  const pagination = dataSelectors.pagination(state, paginationName);
  return {
    data: pagination.getData(),
    loading: pagination.isLoading(),
    loadingMore: pagination.isLoadingMore(),
    hasNext: pagination.hasNext(),
    hasData: pagination.hasData()
  };
};

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
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

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
