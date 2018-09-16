import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import CompleteInfoScreen from './CompleteInfoScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';

const SignupStackNavigator = createStackNavigator(
  {
    signup: SignupScreen,
    completeInfo: CompleteInfoScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default createSwitchNavigator({
  login: LoginScreen,
  signup: SignupStackNavigator,
  forgetPassword: ForgetPasswordScreen
});
