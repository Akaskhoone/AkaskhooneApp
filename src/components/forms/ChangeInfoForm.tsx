import ImageField from '@elements/ImageField';
import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
import { Button, Form, Text } from 'native-base';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
interface Props {
  submitting: boolean;
  error: string;
  [propName: string]: any;
}

const ChangeInfoForm = (props: Props) => {
  return (
    <Form style={{ flex: 1 }}>
      <Field component={ImageField} name="image" />
      <Field component={TextField} name="username" isRtl={false} disabled={true} />
      <Field component={TextField} name="name" />
      <Field component={TextField} name="email" isRtl={false} disabled={true} />
      <Field component={TextField} name="bio" multiline={true} numberOfLines={7} />
      <Button block={true} primary={true} disabled={props.submitting} onPress={props.handleSubmit}>
        <Text>{I18n.t('saveChanges')}</Text>
      </Button>
      {props.error && <Text danger={true}>{I18n.t(props.error)}</Text>}
    </Form>
  );
};
const formValidator = values => {
  const errors = { name: undefined };
  errors.name = !values.name ? ['required'] : undefined;
  return errors;
};
export default reduxForm({ form: 'changeInfo', validate: formValidator })(ChangeInfoForm);
