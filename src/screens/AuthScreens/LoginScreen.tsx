import { loginUser } from '@actions/loginActions';
import LoginForm from '@components/forms/LoginForm';
import Logo from '@components/Logo';
import I18n from '@utils/i18n';
import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  login: Function;
}
export class LoginScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.mainView} enableResetScrollToCoords={true}>
          <View style={styles.headerView}>
            <Logo />
          </View>
          <View style={styles.bodyView}>
            <LoginForm onSubmit={this.loginSubmit} />
            <Button
              block={true}
              transparent={true}
              dark={true}
              onPress={this.navigateTo('forgetPassword')}>
              <Text>{I18n.t('forgetPasswordLink')}</Text>
            </Button>
          </View>
          <View style={styles.footerView}>
            <Button block={true}>
              <Text>{I18n.t('loginWithGoogle')}</Text>
            </Button>
            <Button block={true} transparent={true} dark={true} onPress={this.navigateTo('signup')}>
              <Text>{I18n.t('signup')}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  private navigateTo = name => () => {
    this.props.navigation.navigate(name);
  };

  private loginSubmit = vals => {
    return this.props.login(vals.email, vals.password).catch(res => {
      const errors = extractErrors(res, ['email', 'password', 'RequestError']);
      throw new SubmissionError({
        email: errors.email,
        password: errors.password,
        _error: errors.RequestError
      });
    });
  };
}

interface Styles {
  mainView: ViewStyle;
  headerView: ViewStyle;
  bodyView: ViewStyle;
  footerView: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  mainView: {
    minHeight: '100%',
    marginHorizontal: scale(20)
  },
  headerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyView: {},
  footerView: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
