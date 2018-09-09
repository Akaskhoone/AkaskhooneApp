import { createStackNavigator } from 'react-navigation';
import ChangeInfoScreen from './ChangeInfoScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';

const profileStack = createStackNavigator(
  {
    profile: ProfileScreen,
    setting: SettingScreen,
    changePassword: ChangePasswordScreen,
    changeInfo: ChangeInfoScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
profileStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0
});
export default profileStack;
