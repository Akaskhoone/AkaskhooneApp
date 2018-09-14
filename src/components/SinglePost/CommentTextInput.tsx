import TextField from '@elements/TextField';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CommentTextInput extends Component {
  public render() {
    return (
      <Form style={{ backgroundColor: 'white' }}>
        <Field component={TextField} name="text" bordered={true} />
      </Form>
    );
  }
}

export default reduxForm({ form: 'comment' })(CommentTextInput);
