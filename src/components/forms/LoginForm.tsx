import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
import { isEmail } from '@utils/validators';
import { Button, Content, Form, Text } from 'native-base';
import React, { Component } from 'react';
import { ViewStyle } from 'react-native';
import { Field, reduxForm } from 'redux-form';

interface Props {
  style?: ViewStyle;
  // submitting & error fields are comming from redux-form
  submitting: boolean;
  error: string;
  [propName: string]: any;
}

const LoginForm = (props: Props) => {
  return (
    <Form>
      <Field component={TextField} name="email" />
      <Field component={TextField} name="password" secureTextEntry={true} />
      <Button block={true} primary={true} disabled={props.submitting} onPress={props.handleSubmit}>
        <Text>{I18n.t('login')}</Text>
      </Button>
      {props.error && <Text danger={true}>{I18n.t(props.error)}</Text>}
    </Form>
  );
};

const formValidator = values => {
  const errors = { email: undefined, password: undefined };
  errors.email = !values.email ? ['required'] : !isEmail(values.email) ? ['isWrong'] : undefined;
  errors.password = !values.password ? ['required'] : undefined;
  return errors;
};

export default reduxForm({
  form: 'login',
  validate: formValidator
})(LoginForm);
