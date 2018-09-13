import PostCard from '@components/PostCard';
import SinglePost from '@components/SinglePost';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Content, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Reactotron from 'reactotron-react-native';

interface Props {
  navigation: any;
}
export class PostScreen extends Component<Props> {
  public render() {
    Reactotron.log(this.props.navigation.getParam('item'));
    const post = this.props.navigation.getParam('item');
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body />
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <MyIcon name="back" size={26} color="#fff" />
            </Button>
          </Right>
        </Header>
        <SinglePost postId={post} />
      </Container>
    );
  }
  private goBack = () => {
    this.props.navigation.goBack(null);
  };
}

export default PostScreen;
