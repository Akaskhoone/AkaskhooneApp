import variable from 'src/theme/variables/commonColor';

export default (variables = variable) => {
  const TextFieldTheme = {
    'NativeBase.Text': {
      marginVertical: 5
    },
    '.disabled': {
      backgroundColor: '#cecece'
    },
    marginBottom: 5
  };
  return TextFieldTheme;
};
