import DefaultHomeComponent from '@components/DefaultHomeComponent';
import PostCard from '@components/PostCard';
import MyIcon from '@elements/Icon';
import Paginator from '@libs/Paginator';
import I18n from '@utils/i18n';
import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
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
        <Paginator
          defaultComponent={DefaultHomeComponent}
          name="feed"
          type="posts"
          url="/social/home/?limit=10"
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
