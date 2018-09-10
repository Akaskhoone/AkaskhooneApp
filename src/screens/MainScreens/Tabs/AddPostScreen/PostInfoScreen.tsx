import AddCaptionComponent from '@components/AddCaptionComponent';
import I18n from '@utils/i18n';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
interface Props {
  uri: string;
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
        <Content>
          <AddCaptionComponent uri={this.props.uri} />
        </Content>
      </Container>
    );
  }
}
const mapStateToProp = state => ({
  uri: state.selectPicture.imageUri
});

export default connect(mapStateToProp)(PostInfoScreen);
