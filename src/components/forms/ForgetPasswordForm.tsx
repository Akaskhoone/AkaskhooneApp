import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
import { isEmail } from '@utils/validators';
import { Button, Form, Text } from 'native-base';
import React from 'react';
import { ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Field, reduxForm } from 'redux-form';

interface Prop {
  style?: ViewStyle;
  email: string;
  submitting: boolean;
  error: string;
  [propName: string]: any;
}

const ForgetPasswordForm = (props: Prop) => {
  return (
    <Form>
      <Field component={TextField} name="email" />
      <Button block={true} primary={true} disabled={props.submitting} onPress={props.handleSubmit}>
        <Text>{I18n.t('submit')}</Text>
      </Button>
      {props.error ? <Text danger={true}>{I18n.t(props.error)}</Text> : null}
    </Form>
  );
};

const formValidator = values => {
  const errors = { email: undefined };
  errors.email = !values.email ? ['required'] : !isEmail(values.email) ? ['isWrong'] : undefined;
  return errors;
};

export default reduxForm({
  form: 'forgetPassword',
  validate: formValidator
})(ForgetPasswordForm);
