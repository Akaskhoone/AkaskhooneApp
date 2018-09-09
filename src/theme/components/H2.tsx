import variable from "../variables/commonColor";

export default (variables = variable) => {
	const h2Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH2,
		lineHeight: variables.lineHeightH2,
	};

	return h2Theme;
};
