import SinglePost from '@components/SinglePost';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Left, Right } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import Reactotron from 'reactotron-react-native';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export class PostScreen extends Component<Props> {
  public render() {
    const postId = this.props.navigation.getParam('postId');
    Reactotron.log('Post screen opened with postID:', postId);
    return (
      <Container style={{ flex: 1 }}>
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
        <SinglePost postId={postId} />
      </Container>
    );
  }
  private goBack = () => {
    this.props.navigation.goBack(null);
  };
}

export default PostScreen;
