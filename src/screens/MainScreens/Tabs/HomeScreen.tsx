import DefaultHomeComponent from '@components/DefaultHomeComponent';
import Feed from '@components/Feed';
import MyIcon from '@elements/Icon';
import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import I18n from 'src/utils/i18n';

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
        <Feed
          defaultComponent={DefaultHomeComponent}
          showSinglePost={this.navigateTo('post')}
          showProfile={this.navigateTo('othersProfile')}
        />
      </Container>
    );
  }

  private navigateTo = name => params => this.props.navigation.navigate(name, params);
}

export default HomeScreen;
