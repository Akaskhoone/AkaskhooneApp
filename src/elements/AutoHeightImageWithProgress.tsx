import React, { Component } from 'react';
import { Image } from 'react-native';
import ProgressImage from 'react-native-image-progress';
import { Circle } from 'react-native-progress';
import Reactotron from 'reactotron-react-native';

interface Props {
  uri: string;
  width: number;
}

export class AutoHeightImageWithProgress extends Component<Props> {
  public state = {
    height: undefined
  };
  private imageStyle = {};
  private uri = undefined;
  private width = undefined;

  constructor(props) {
    super(props);
    this.init(props);
  }

  public componentDidMount() {
    this.updateImageHeight();
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.width || nextProps.uri !== this.uri) {
      this.init(nextProps);
      this.updateImageHeight();
    }
  }

  public render() {
    return (
      <ProgressImage
        source={{ uri: this.uri }}
        indicator={Circle}
        indicatorProps={{ showsText: true }}
        style={this.imageStyle}
      />
    );
  }

  private updateImageHeight() {
    Image.getSize(this.uri, this.onReceiveSizeSuccess, this.onReceiveSizeFail);
  }
  private onReceiveSizeSuccess = (width, height) => {
    this.imageStyle = {
      width: this.width,
      height: (height * this.width) / width
    };
    this.setState({ height });
  };
  private onReceiveSizeFail = error => {
    throw error;
  };

  private init = props => {
    this.uri = props.uri;
    this.width = props.width;
    this.imageStyle = { width: this.width, height: 200 };
  };
}
export default AutoHeightImageWithProgress;
