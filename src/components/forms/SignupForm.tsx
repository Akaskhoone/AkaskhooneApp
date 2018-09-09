import TextField from '@elements/TextField';
import I18n from '@i18n/index';
import { Button, Form, Text } from 'native-base';
import React, { Component } from 'react';
import { ViewStyle } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'src/utils/validators';

interface Prop {
  style?: ViewStyle;
  submitting?: boolean;
  error?: string;
  [propName: string]: any;
}
const SignupForm = (props: Prop) => {
  Reactotron.log('Signup form props:', props);
  return (
    <Form>
      <Field component={TextField} name="email" />
      <Field component={TextField} name="password" secureTextEntry={true} />
      <Field component={TextField} name="passwordConfirm" secureTextEntry={true} />
      <Button disabled={props.submitting} onPress={props.handleSubmit} block={true}>
        <Text>{I18n.t('signup')}</Text>
      </Button>
      {props.error ? <Text danger={true}>{I18n.t(props.error)}</Text> : null}
    </Form>
  );
};

const formValidator = values => {
  const errors = {
    email: undefined,
    password: undefined,
    passwordConfirm: undefined
  };
  errors.email = !values.email ? ['required'] : !isEmail(values.email) ? ['isWrong'] : undefined;
  errors.password = !values.password ? ['required'] : undefined;
  errors.passwordConfirm = !values.passwordConfirm
    ? ['required']
    : values.passwordConfirm !== values.password
      ? ['isWrong']
      : undefined;
  return errors;
};

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: formValidator
})(SignupForm);
