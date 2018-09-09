import I18n from '@utils/i18n';
import { connectStyle, Input, InputGroup, Text } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';

interface Props {
  input: any;
  name: string;
  meta: any;
  isRtl: boolean;
  placeholder: string;
  disabled?: boolean;
  style: any;
}

class TextField extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    isRtl: true
  };
  public render() {
    const {
      input,
      input: { name },
      style,
      isRtl,
      meta,
      placeholder,
      disabled,
      ...otherProps
    } = this.props;
    const isInvalidAndDirty = meta.invalid && meta.dirty;
    const isValidAndDirty = meta.valid && meta.dirty;
    const shouldShowError = meta.error && meta.submitFailed;
    return (
      <View style={style}>
        <InputGroup
          regular={true}
          error={isInvalidAndDirty}
          success={isValidAndDirty}
          disabled={disabled}>
          <Input
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            placeholder={placeholder || I18n.t(name)}
            disabled={disabled}
            style={{
              textAlign: isRtl ? 'right' : 'left'
            }}
            {...otherProps}
          />
        </InputGroup>
        {shouldShowError &&
          meta.error.map((e, i) => (
            <Text key={i} danger={true}>
              {I18n.t(e, { name: I18n.t(name) })}
            </Text>
          ))}
      </View>
    );
  }
}
export default connectStyle('Akaskhoone.TextField', {})(TextField);
