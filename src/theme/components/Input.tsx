import { scale } from '../../../node_modules/react-native-size-matters';
import variable from '../variables/commonColor';

export default (variables = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
      textAlignVertical: 'top',
      paddingVertical: scale(10)
    },
    paddingRight: variables.inputPadding,
    paddingLeft: variables.inputPadding,
    paddingBottom: 0,
    paddingTop: 0,
    width: '100%',
    // textAlign: 'right',
    height: variables.inputHeightBase,
    color: '#000',
    fontSize: variables.inputFontSize,
    fontFamily: variables.fontFamily,
    lineHeight: variables.inputLineHeight
  };

  return inputTheme;
};
