import env from '@utils/env.json';
import NavigationService from '@utils/NavigationService';
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';

const { width } = Dimensions.get('window');

interface StateProps {
  post: any;
}
interface OwnProps {
  postId: string;
  columnNum: number;
  index: number;
}
type Props = OwnProps & StateProps;
export class Post extends Component<Props> {
  public render() {
    const imageMargin = 5;
    const { columnNum, index } = this.props;
    const imageSize = (width - (columnNum + 1) * imageMargin) / columnNum;
    const isMostRight = index % columnNum === columnNum - 1;
    return (
      <TouchableHighlight
        style={{
          marginRight: isMostRight ? 0 : 5,
          marginBottom: 5,
          alignSelf: 'stretch',
          backgroundColor: 'gray'
        }}
        onPress={this.navigateToPost}>
        <Image
          source={{ uri: `${env.ASSETS_URL}/${this.props.post.image}` }}
          style={{ width: imageSize, height: imageSize }}
        />
      </TouchableHighlight>
    );
  }
  private navigateToPost = () => {
    NavigationService.navigate('post', { postId: this.props.postId });
  };
}

const mapStateToProps = (state, ownProps): StateProps => ({
  post: selectors.posts.getData(state, ownProps.postId)
});
export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Post);
