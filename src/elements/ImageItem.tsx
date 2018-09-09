import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  item: any;
  selected: boolean;
  onClick: Function;
  imageMargin: number;
  imagesPerRow: number;
  containerWidth?: number;
  selectedMarker?: any;
  index: number;
}
class ImageItem extends Component<Props> {
  private imageSize = undefined;

  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    const { width: windowWidth } = Dimensions.get('window');
    const { imageMargin, imagesPerRow, containerWidth } = this.props;
    const width = containerWidth || windowWidth;
    this.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
  }
  public render() {
    const { item, selected, selectedMarker, imageMargin, index } = this.props;

    const marker = selectedMarker ? (
      selectedMarker
    ) : (
      <View style={{ width: 20, height: 20, position: 'absolute', top: 10, right: 10 }}>
        <Text>
          <Icon name="checkbox" />
        </Text>
      </View>
    );

    const image = item.node.image;
    return (
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginRight: index % 3 !== 2 ? imageMargin : 0,
          alignSelf: 'stretch'
        }}
        onPress={this.handleClick(image)}>
        <Image
          source={{ uri: image.uri }}
          style={{ height: this.imageSize, width: this.imageSize }}
        />
        {selected ? marker : null}
      </TouchableOpacity>
    );
  }

  public handleClick = item => () => {
    this.props.onClick(item);
  };
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent'
  }
});

export default ImageItem;
