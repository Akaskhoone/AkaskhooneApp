import MyIcon from '@elements/Icon';
import env from '@utils/env.json';
import { Body, Button, Container, Content, Header, Left, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import Paginator from 'src/libs/Paginator/Paginator';
import { selectors } from 'src/reducers';

const width = Dimensions.get('window').width;
interface OwnProps {
  navigation: any;
  // name: string;
}
interface StateProps {
  getPostFromId: any;
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
        <Content>
          <Paginator
            defaultComponent={this.defaultComponent}
            name={`${name}_posts`}
            type="posts"
            url={`/social/posts/?tag=${name}`}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </Content>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
  private navigateTo = (name, param?) => () => this.props.navigation.navigate(name, param);
  private defaultComponent = () => {
    return <View />;
  };
  private renderItem = ({ item, index }) => {
    const imageMargin = 5;
    const columnNum = 2;
    const imageSize = (width - (columnNum + 1) * imageMargin) / columnNum;
    const isMostRight = index % columnNum === columnNum - 1;
    const post = this.props.getPostFromId(item);
    return (
      <TouchableNativeFeedback onPress={this.navigateTo('post', { postId: post.id })}>
        <Image
          style={{
            width: imageSize,
            height: imageSize,
            marginRight: isMostRight ? 0 : 5,
            marginBottom: 5,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          source={{ uri: `${env.ASSETS_URL}/${post.image}` }}
        />
      </TouchableNativeFeedback>
    );
  };
}

const mapStateToProps = (state): StateProps => ({
  getPostFromId: imageId => selectors.posts.getData(state, imageId)
});
export default connect(mapStateToProps)(TagScreen);
