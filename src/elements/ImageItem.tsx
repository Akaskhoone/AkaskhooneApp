import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  item: any;
  index: number;
  onPress: Function;
  imagesPerRow: number;
  imageMargin?: number;
  selected?: boolean;
  containerWidth?: number;
  selectedMarker?: any;
  imageExtractor?: (item: any) => { uri: string; [propName: string]: any };
}

class ImageItem extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    containerWidth: Dimensions.get('window').width,
    selected: false,
    imageMargin: 5,
    imageExtractor: item => ({
      uri: item.uri
    }),
    selectedMarker: (
      <View style={{ width: 20, height: 20, position: 'absolute', top: 10, right: 10 }}>
        <Text>
          <Icon name="checkbox" />
        </Text>
      </View>
    )
  };

  private imageSize = undefined;
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    const { imageMargin, imagesPerRow, containerWidth } = this.props;
    this.imageSize = (containerWidth - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }
  public render() {
    const { item, selected, selectedMarker, imageMargin, index, imagesPerRow } = this.props;

    const image = this.props.imageExtractor(item);
    const isMostLeft = index % imagesPerRow === 0;
    return (
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginLeft: !isMostLeft ? imageMargin : 0,
          alignSelf: 'stretch'
        }}
        onPress={this.handleClick(item)}>
        <Image source={image} style={{ height: this.imageSize, width: this.imageSize }} />
        {selected ? selectedMarker : null}
      </TouchableOpacity>
    );
  }

  public handleClick = item => () => {
    this.props.onPress(item);
  };
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 5,
    right: 5,
    backgroundColor: 'transparent'
  }
});

export default ImageItem;
