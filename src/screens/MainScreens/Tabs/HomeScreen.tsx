import DefaultHomeComponent from '@components/DefaultHomeComponent';
import PostCard from '@components/PostCard';
import MyIcon from '@elements/Icon';
import Paginator from '@libs/Paginator';
import I18n from '@utils/i18n';
import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';

interface Props {
  hasFeedPosts: boolean;
  navigation: any;
}
class HomeScreen extends Component<Props> {
  public render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent={true}>
              <MyIcon name="addfriends" size={24} color="white" />
            </Button>
          </Left>

          <Body>
            <Title style={{ fontSize: 18, fontWeight: 'bold' }}>{I18n.t('appName')}</Title>
          </Body>
          <Right>
            <Button disabled={true} transparent={true} />
          </Right>
        </Header>
        {/* <Feed
          defaultComponent={DefaultHomeComponent}
          showSinglePost={this.navigateTo('post')}
          showProfile={this.navigateTo('othersProfile')}
        /> */}
        <Paginator
          defaultComponent={DefaultHomeComponent}
          name="feed"
          type="posts"
          url="/social/home/"
          renderItem={this.renderItem}
        />
      </Container>
    );
  }

  private renderItem = ({ item }) => {
    return <PostCard postId={item} />;
  };
}

export default HomeScreen;
