import TextField from '@elements/TextField';
import { Form, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Field, reduxForm } from 'redux-form';
interface Props {
  uir: string;
  [propName: string]: any;
}
class AddCaptionComponent extends Component<Props> {
  public render() {
    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          marginHorizontal: 15,
          marginTop: 15,
          height: 100
        }}>
        <Thumbnail
          source={{ uri: this.props.uri }}
          square={true}
          large={true}
          style={{ alignSelf: 'stretch', aspectRatio: 1, borderRadius: 10 }}
        />
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Field component={TextField} name="caption" multiline={true} numOfLine={15} />
        </View>
        {/* <Text>Add Caption Component</Text> */}
      </View>
    );
  }
}
export default reduxForm({ form: 'addCaption' })(AddCaptionComponent);
