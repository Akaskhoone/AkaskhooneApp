import { createPost } from '@actions/createPostActions';
import AddCaptionComponent from '@components/forms/AddCaptionForm';
import I18n from '@utils/i18n';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View
} from 'native-base';

import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
interface Props {
  uri: string;
  sendPost: Function;
  [propName: string]: any;
}

class PostInfoScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Title>{I18n.t('postInfoHeaderText')}</Title>
          </Body>
          <Right>
            <Button transparent={true}>
              <Icon type="Feather" name="arrow-right" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <AddCaptionComponent uri={this.props.uri} onSubmit={this.submitSentPost} />
        </Content>
      </Container>
    );
  }
  private navigateTo = name => this.props.navigation.navigate(name);
  private submitSentPost = vals => {
    return this.props.sendPost(vals, this.props.uri).then(() => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'tabs',
              action: NavigationActions.navigate({ routeName: 'home' })
            })
          ]
        })
      );
    });
  };
}
const mapDispatchToProps = dispatch => ({
  sendPost: (vals, uri) => dispatch(createPost(vals.caption, vals.tags, vals.location, uri))
});
const mapStateToProp = state => ({
  uri: state.selectPicture.imageUri
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(PostInfoScreen);
