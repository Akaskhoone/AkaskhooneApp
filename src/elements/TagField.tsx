import { connectStyle, Text, View } from 'native-base';
import React, { Component } from 'react';
import Tags from 'react-native-tags';
import I18n from 'src/utils/i18n';

interface Props {
  name: string;
  placeholder: string;
  style: any;
  [propName: string]: any;
}
class TagField extends Component<Props> {
  public state = {
    emails: [],
    text: ''
  };
  public render() {
    const {
      input,
      input: { name },
      style,
      meta,
      placeholder,
      disabled,
      inputStyle,
      ...otherProps
    } = this.props;
    const isInvalidAndDirty = meta.invalid && meta.dirty;
    const isValidAndDirty = meta.valid && meta.dirty;
    const shouldShowError = meta.error && meta.submitFailed;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ marginRight: 8, color: 'gray' }}>تگ ها</Text>
        <Tags
          onChangeTags={this.props.input.onChange}
          initialTags={this.props.input.value || []}
          containerStyle={{ justifyContent: 'center' }}
          inputStyle={this.props.style}
        />
      </View>
    );
  }
}

export default connectStyle('Nativebase.Input', {})(TagField);
