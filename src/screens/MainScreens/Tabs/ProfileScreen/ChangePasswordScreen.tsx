import { changePassword } from '@actions/changePassword';
import ChangePasswordForm from '@components/forms/ChangePasswordForm';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title,
  Toast
} from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';
import I18n from 'src/utils/i18n';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  changePassword: Function;
  password: string;
}
class ChangePasswordScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent={true} />
          </Left>
          <Body>
            <Title style={{ fontSize: 16 }}>{I18n.t('changePassword')}</Title>
          </Body>
          <Right>
            <Button transparent={true} onPress={this.goBack}>
              <Icon type="Feather" name="arrow-right" style={{ fontSize: 26 }} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ margin: 20, flex: 1 }}>
          <ChangePasswordForm onSubmit={this.handleSubmit} password={this.props.password} />
        </Content>
      </Container>
    );
  }
  private goBack = () => this.props.navigation.goBack();
  private handleSubmit = vals => {
    return this.props
      .changePassword(vals)
      .then(() => {
        Toast.show({ text: I18n.t('changedSuccessfully', { name: I18n.t('password') }) });
        this.goBack();
      })
      .catch(res => {
        const errors = extractErrors(res, ['old_password', 'new_password', 'RequestError']);
        throw new SubmissionError({
          oldPassword: errors.old_password,
          newPassword: errors.new_password,
          _error: errors.RequestError
        });
      });
  };
}
const mapDispatchToProps = dispatch => ({
  changePassword: vals => dispatch(changePassword(vals))
});

export default connect(
  null,
  mapDispatchToProps
)(ChangePasswordScreen);
