import MyIcon from '@elements/Icon';
import Paginator from '@libs/Paginator/Paginator';
import { selectors } from '@reducers/index';
import env from '@utils/env.json';
import { PostDTO } from '@utils/interfaces';
import { Body, Button, Container, Content, Header, Left, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, TouchableNativeFeedback } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import ImageItem from 'src/elements/ImageItem';

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}
interface StateProps {
  getPostFromId: (string) => PostDTO;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

class TagScreen extends Component<Props> {
  public render() {
    const name = this.props.navigation.getParam('tagId');

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Text style={{ color: '#fff', fontSize: 18 }}>#{name}</Text>
          </Body>
          <Right>
            <Button onPress={this.goBack} transparent={true}>
              <MyIcon name="back" size={24} color="#fff" />
            </Button>
          </Right>
        </Header>
        <View style={{ alignItems: 'center' }}>
          <Paginator
            defaultComponent={this.defaultComponent}
            name={`#${name}_posts`}
            type="posts"
            url={`/social/posts/?tag=${name}`}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </View>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
  private navigateTo = (name, param?) => () => this.props.navigation.navigate(name, param);
  private defaultComponent = () => {
    return <View />;
  };
  private renderItem = ({ item, index }) => {
    const post = this.props.getPostFromId(item);
    return (
      <ImageItem
        imagesPerRow={2}
        imageExtractor={this.imageExtractor}
        index={index}
        onPress={this.navigateTo('post', { postId: post.id })}
        item={post}
      />
    );
  };
  private imageExtractor = post => ({ uri: post.image });
}

const mapStateToProps = (state): StateProps => ({
  getPostFromId: postId => selectors.posts.getData(state, postId)
});
export default connect(mapStateToProps)(TagScreen);
