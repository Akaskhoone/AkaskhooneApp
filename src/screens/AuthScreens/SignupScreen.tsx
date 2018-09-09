import { signupSubmited } from '@actions/signupActions';
import SignupForm from '@components/forms/SignupForm';
import Logo from '@components/Logo';
import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';
import I18n from 'src/utils/i18n';

interface Props {
  navigation: any;
  signup: Function;
}
export class SignupScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.mainView} enableResetScrollToCoords={true}>
          <View style={styles.headerView}>
            <Logo />
          </View>
          <View style={styles.bodyView}>
            <SignupForm onSubmit={this.handle_submit} />
          </View>
          <View style={styles.footerView}>
            <Button block={true}>
              <Text>{I18n.t('loginWithGoogle')}</Text>
            </Button>
            <Button block={true} transparent={true} dark={true} onPress={this.navigateTo('login')}>
              <Text>{I18n.t('loginLink')}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
  // navigation :argument of switch navigator ,
  // navigate: to go to switch state with writen name
  private navigateTo = name => () => this.props.navigation.navigate(name);
  private handle_submit = vals => {
    return this.props
      .signup(vals)
      .then(this.navigateTo('completeInfo'))
      .catch(res => {
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
  bodyView: {
    paddingBottom: scale(20)
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

const mapDispatchToProps = dispach => ({
  signup: vals => dispach(signupSubmited(vals.email, vals.password))
});

export default connect(
  null,
  mapDispatchToProps
)(SignupScreen);
