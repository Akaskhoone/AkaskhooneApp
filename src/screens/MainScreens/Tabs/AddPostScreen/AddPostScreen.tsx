import { setPostImage } from '@actions/createPostActions';
import CameraComponent from '@components/CameraComponent';
import GalleryComponent from '@components/GalleryComponent';
import I18n from '@utils/i18n';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

interface Props {
  isSelected: boolean;
  navigation: NavigationScreenProp<any, any>;
  setPostImage: Function;
  imageUri: string;
  [propName: string]: any;
}

export class AddPostScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>{I18n.t('createPostHeaderText')}</Text>
          </Body>
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <Icon type="Entypo" name="cross" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 3 }}>
            <CameraComponent value={this.props.imageUri} onChange={this.props.setPostImage} />
          </View>
          <View style={{ flex: 2 }}>
            <GalleryComponent value={this.props.imageUri} onChange={this.props.setPostImage} />
          </View>
          <Button
            block={true}
            rounded={true}
            large={true}
            style={{ marginHorizontal: 10, position: 'absolute', left: 0, right: 0, bottom: 10 }}
            onPress={this.submitHandler}>
            <Text>{I18n.t('selectPostPicture')}</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  private navigateTo = name => () => this.props.navigation.navigate(name);
  private goBack = () => this.props.navigation.goBack(null);
  private submitHandler = () => {
    if (this.props.isSelected) {
      this.navigateTo('postInfo')();
    }
  };
}
const mapDispatchToProp = dispatch => ({
  setPostImage: imageUri => dispatch(setPostImage(imageUri))
});
const mapStateToProp = state => ({
  imageUri: state.selectPicture.imageUri,
  isSelected: state.selectPicture.selected
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(AddPostScreen);
