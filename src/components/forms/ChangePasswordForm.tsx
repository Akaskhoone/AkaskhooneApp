import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
import { Button, Form, Icon, Text } from 'native-base';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Field, reduxForm } from 'redux-form';

interface Props {
  style?: ViewStyle;
  [name: string]: any;
}
const ChangePasswordForm = (props: Props) => (
  <Form style={{ flex: 1 }}>
    <View style={{ marginBottom: 30, marginTop: 50, alignItems: 'center' }}>
      <Icon
        type="Ionicons"
        name="md-checkmark-circle-outline"
        style={{ fontSize: 32, color: 'gray' }}
      />
    </View>
    <Field component={TextField} name="oldPassword" secureTextEntry={true} />
    <Field component={TextField} name="newPassword" secureTextEntry={true} />
    <Field component={TextField} name="newPasswordConfirm" secureTextEntry={true} />
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Button block={true} primary={true} onPress={props.handleSubmit}>
        <Text>{I18n.t('changePassword')}</Text>
      </Button>
    </View>
    {props.submitError && <Text danger={true}>{props.submitError}</Text>}
  </Form>
);

const formValidator = values => {
  const errors = { oldPassword: undefined, newPassword: undefined, newPasswordConfirm: undefined };
  errors.oldPassword = !values.oldPassword ? ['required'] : undefined;
  errors.newPassword = !values.newPassword ? ['required'] : undefined;
  errors.newPasswordConfirm = !values.newPasswordConfirm
    ? ['required']
    : values.newPasswordConfirm !== values.newPassword
      ? ['isWrong']
      : undefined;
  return errors;
};

export default reduxForm({
  form: 'changePassword',
  validate: formValidator
})(ChangePasswordForm);
