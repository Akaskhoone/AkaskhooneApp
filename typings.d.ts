import { SFC } from 'react';
import * as ReactNative from 'react-native';

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'native-base' {
  namespace NativeBase {
    interface Text extends ReactNative.TextProperties {
      note?: boolean;
      uppercase?: boolean;
      danger?: boolean;
    }
  }
  export const connectStyle: (themeName: string, defaultStyle: object) => any;
}
