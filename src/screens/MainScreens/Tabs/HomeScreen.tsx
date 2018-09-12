import DefaultHomeComponent from '@components/DefaultHomeComponent';
import Feed from '@components/Feed';
import PostCard from '@components/PostCard';
import MyIcon from '@elements/Icon';
import Paginator from '@libs/Paginator';
import I18n from '@utils/i18n';
import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';

interface Props {
  hasFeedPosts: boolean;
  navigation: any;
}
class HomeScreen extends Component<Props> {
  public render() {
    return (
      <Container>
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
          keyExtractor={this.keyExtractor}
        />
      </Container>
    );
  }

  private keyExtractor = a => a;
  private renderItem = ({ item }) => {
    return (
      <PostCard
        dataId={item}
        onImagePress={this.navigateTo('post', item)}
        onProfilePress={this.navigateTo('othersProfile', item)}
      />
    );
  };
  private navigateTo = (name, params) => () => this.props.navigation.navigate(name, params);
}

export default HomeScreen;
