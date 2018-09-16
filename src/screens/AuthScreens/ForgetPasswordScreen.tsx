import { forgetPasswordSubmited } from '@actions/forgetPasswordActions';
import ForgetPasswordForm from '@components/forms/ForgetPasswordForm';
import Logo from '@components/Logo';
import I18n from '@utils/i18n';
import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { SubmissionError } from 'redux-form';
import { extractErrors } from 'src/utils/helpers';

interface Props {
  navigation: any;
  forgetPassword: Function;
}

export class ForgetPasswordScreen extends Component<Props> {
  public render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.mainView} enableResetScrollToCoords={true}>
          <View style={styles.headerView}>
            <Logo />
          </View>
          <View style={styles.bodyView}>
            <ForgetPasswordForm onSubmit={this.handle_submit} />
          </View>
          <View style={styles.footerView}>
            <Button block={true} transparent={true} dark={true} onPress={this.navigateTo('login')}>
              <Text>{I18n.t('return')}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  private navigateTo = name => () => {
    this.props.navigation.navigate(name);
  };

  private handle_submit = vals => {
    return this.props.forgetPassword(vals).then(this.navigateTo('login'));
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
  forgetPassword: vals => dispach(forgetPasswordSubmited(vals.email))
});

export default connect(
  null,
  mapDispatchToProps
)(ForgetPasswordScreen);
