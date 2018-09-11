import TagField from '@elements/TagField';
import TextField from '@elements/TextField';
import I18n from '@utils/i18n';
import { Button, Form, Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import tags from 'react-native-tags';
import { Field, reduxForm } from 'redux-form';
interface Props {
  uri: string;
  [propName: string]: any;
}
class AddCaptionComponent extends Component<Props> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row-reverse',
            marginHorizontal: 15,
            marginTop: 15
          }}>
          <Thumbnail
            source={{ uri: this.props.uri }}
            square={true}
            style={{ height: 100, width: 100, borderRadius: 10 }}
          />
          <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 8 }}>
            <Field
              component={TextField}
              name="caption"
              multiline={true}
              numOfLine={4}
              style={{ flex: 1, alignSelf: 'stretch' }}
            />
          </View>
        </View>
        <View style={{ marginTop: 25, flex: 1 }}>
          <Field component={TextField} name="location" />
          <Field component={TagField} name="tags" />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            block={true}
            style={{ alignItems: 'center', borderRadius: 10 }}
            onPress={this.props.handleSubmit}>
            <Text>{I18n.t('sendPost')}</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default reduxForm({ form: 'addCaption' })(AddCaptionComponent);
