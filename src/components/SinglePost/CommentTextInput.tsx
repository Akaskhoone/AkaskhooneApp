import TextField from '@elements/TextField';
import { Form, Icon } from 'native-base';
import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getActionsFor } from 'src/libs/Paginator';
import I18n from 'src/utils/i18n';

interface Props {
  [propname: string]: any;
}
class CommentTextInput extends Component<Props> {
  public render() {
    return (
      <Form style={{ backgroundColor: 'white', flexDirection: 'row' }}>
        <Field component={TextField} name="commentText" bordered={true} style={{ flex: 1 }} />
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={{ alignSelf: 'stretch', paddingHorizontal: 17, justifyContent: 'center' }}>
            <Icon name="send" />
          </View>
        </TouchableWithoutFeedback>
      </Form>
    );
  }
  private handlePress = () => {
    this.props.handleSubmit();
  };
}

const formValidator = values => {
  const errors = { commentText: undefined };
  errors.commentText = !values.commentText ? ['required'] : undefined;
  return errors;
};
export default reduxForm({
  form: 'comment',
  validate: formValidator
})(CommentTextInput);
