import ImageField from '@elements/ImageField';
import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
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

const CompleteInfoForm = (props: Prop) => {
  return (
    <Form>
      {/* email chon functionale "this " nmikhd */}
      <Field component={ImageField} name="image" />
      <Field component={TextField} name="username" />
      <Field component={TextField} name="name" />
      <Field component={TextField} disabled={true} name="email" />
      <Field
        component={TextField}
        placeholder={I18n.t('tellAboutYourself')}
        name="bio"
        multiline={true}
        numberOfLines={7}
      />
      <Button block={true} primary={true} disabled={props.submitting} onPress={props.handleSubmit}>
        <Text>{I18n.t('completeInfo')}</Text>
      </Button>
      {props.error ? <Text danger={true}>{I18n.t(props.error)}</Text> : null}
    </Form>
  );
};

const formValidator = values => {
  const errors = { username: undefined, name: undefined };
  errors.username = !values.username ? ['required'] : undefined;
  errors.name = !values.name ? ['required'] : undefined;
  return errors;
};

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: formValidator
})(CompleteInfoForm);
