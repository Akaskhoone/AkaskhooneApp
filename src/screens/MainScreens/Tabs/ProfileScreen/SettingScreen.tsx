import { logout } from '@actions/loginActions';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'src/utils/i18n';

interface Props {
  navigation: any;
  [propName: string]: any;
}

class SettingScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Title style={{ fontSize: 18 }}>{I18n.t('settings')}</Title>
          </Body>
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <Icon type="Feather" name="arrow-right" style={{ fontSize: 28 }} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
            <Card
              transparent={true}
              style={{
                padding: 20,
                borderColor: 'gray',
                flex: 0
              }}>
              <CardItem cardBody={true}>
                <Left>
                  <Button transparent={true} onPress={this.navigateTo('changePassword')}>
                    <Icon type="Feather" name="arrow-left" style={{ fontSize: 26 }} />
                  </Button>
                </Left>
                <Right>
                  <Text style={{ fontSize: 14 }}>{I18n.t('changePassword')}</Text>
                </Right>
              </CardItem>
            </Card>
          </View>
          <Button large={true} block={true} transparent={true} onPress={this.props.logout}>
            <Text>{I18n.t('logout')}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  private navigateTo = name => () => this.props.navigation.navigate(name);
  private goBack = () => this.props.navigation.goBack();
}

const mapDispatchToState = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToState
)(SettingScreen);
