import variable from '../variables/commonColor';

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize
    },
    '.danger': {
      color: variables.brandDanger,
      fontSize: variables.fontSizeBase * 0.7
    }
  };

  return textTheme;
};
