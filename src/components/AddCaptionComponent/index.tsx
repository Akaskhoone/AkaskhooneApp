import TextField from '@elements/TextField';
import { Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
interface Props {
  uir: string;
  [propName: string]: any;
}
class AddCaptionComponent extends Component<Props> {
  public render() {
    return (
      <View style={{ flexDirection: 'row-reverse' }}>
        <Thumbnail source={{ uri: this.props.uri }} />
        <Field component={TextField} name="caption" multiline={true} numOfLine={7} />
      </View>
    );
  }
}
export default reduxForm({ form: 'addCaption' })(AddCaptionComponent);
