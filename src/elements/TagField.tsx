import { connectStyle, View } from 'native-base';
import React, { Component } from 'react';
import TagInput from 'react-native-tag-input';
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
        {/* <TagInput
          onChange={this.onItemsChange}
          onChangeText={this.onChangeText}
          value={input.value.items || []}
          text={input.value.text || ''}
          labelExtractor={this.labelExtractor}
          editable={!disabled}
          tagColor="yellow"
          inputProps={{
            placeholder: placeholder || I18n.t(name),
            onBlur: input.onBlur,
            onFocus: input.onFocus
          }}
          style={style}
          name={name}
        /> */}
        <TagInput
          value={this.state.emails}
          onChange={emails => this.setState({ emails })}
          labelExtractor={email => email}
          text={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }

  private onChangeText = text => {
    this.props.input.onChange({
      text,
      items: this.props.input.value.items || []
    });
  };

  private onItemsChange = items => {
    console.warn(items);
    this.props.input.onChange({
      items,
      text: this.props.input.value.text || ''
    });
  };

  private labelExtractor = item => {
    console.warn(item);
    return item;
  };
}

export default connectStyle('akaskhoone.TagField', {})(TagField);
