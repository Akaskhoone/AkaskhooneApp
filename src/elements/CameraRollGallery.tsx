import { Color } from 'csstype';
import React, { Component, ReactElement } from 'react';
import {
  ActivityIndicator,
  CameraRoll,
  FlatList,
  GetPhotosReturnType,
  ImageURISource,
  ListRenderItemInfo,
  StyleSheet,
  View
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import ImageItem from './ImageItem';

interface Props {
  selected?: any[];
  assetType?: any;
  backgroundColor?: Color;
  EmptyComponent: any;
  loader?: any;
  maximum?: number;
  imagesPerRow?: number;
  imageMargin?: number;
  callback: Function;
  selectSingleItem?: boolean;
}
interface State {
  images: GetPhotosReturnType['edges'];
  selected: any[];
  lastCursor: any;
  initialLoading: boolean;
  loadingMore: boolean;
  noMore: boolean;
}
export class CameraRollGallery extends Component<Props, State> {
  public static defaultProps = {
    imagesPerRow: 3,
    imageMargin: 10,
    maximum: 1,
    selectSingleItem: true
  };

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      selected: this.props.selected || [],
      lastCursor: null,
      initialLoading: true,
      loadingMore: false,
      noMore: false
    };
  }

  public componentWillMount() {
    this.fetch();
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== undefined && nextProps.selected !== this.props.selected) {
      this.setState({
        selected: nextProps.selected
      });
    }
  }

  public render() {
    const { backgroundColor, EmptyComponent, loader } = this.props;
    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, { backgroundColor }]}>{loader || <ActivityIndicator />}</View>
      );
    }

    return (
      <View style={[styles.wrapper, { backgroundColor, paddingRight: 0 }]}>
        {this.state.images.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            onEndReached={this.onEndReached}
            data={this.state.images}
            renderItem={this.renderImage}
            keyExtractor={this.keyExtractor}
            numColumns={this.props.imagesPerRow}
            extraData={this.state.selected}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={this.renderFooterSpinner}
          />
        ) : (
          <EmptyComponent />
        )}
      </View>
    );
  }

  private fetch = () => {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        const { assetType } = this.props;
        const fetchParams = {
          assetType,
          after: undefined,
          first: 50
        };
        if (this.state.lastCursor) fetchParams.after = this.state.lastCursor;
        CameraRoll.getPhotos(fetchParams).then(data => this.appendImages(data), Reactotron.log);
      });
    }
  };

  private appendImages = (data: GetPhotosReturnType) => {
    const assets = data.edges;
    const newState: Partial<State> = {
      loadingMore: false,
      initialLoading: false
    };

    if (!data.page_info.has_next_page) newState.noMore = true;
    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.images = this.state.images.concat(assets);
    }

    this.setState(prevState => ({ ...prevState, ...newState }));
  };

  private renderImage = ({ item, index }: ListRenderItemInfo<GetPhotosReturnType['edges'][0]>) => {
    const { selected } = this.state;
    const uri = item.node.image.uri;
    const isSelected = !!selected.filter(s => s === uri).length;

    return (
      <ImageItem
        imageMargin={this.props.imageMargin}
        imagesPerRow={this.props.imagesPerRow}
        item={item}
        selected={isSelected}
        onClick={this.selectImage}
        index={index}
      />
    );
  };

  private keyExtractor = (item: GetPhotosReturnType['edges'][0]) => {
    return item.node.image.uri;
  };

  private renderFooterSpinner = () => {
    if (!this.state.noMore) {
      return <ActivityIndicator />;
    }
    return null;
  };

  private onEndReached = () => {
    if (!this.state.noMore) {
      this.fetch();
    }
  };

  private selectImage = image => {
    const { maximum, callback, selectSingleItem } = this.props;
    const selected = this.state.selected;
    const index = selected.findIndex(s => s.uri === image.uri);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length);
      }
      if (selected.length < maximum) {
        selected.push(image);
      }
    }

    this.setState({
      selected
    });

    callback(selected, image);
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  marker: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'transparent'
  }
});

export default CameraRollGallery;
