import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './OthersProfileScreen';
import PostScreen from './PostScreen';
import TabsScreen from './Tabs';

export default createStackNavigator(
  {
    tabs: TabsScreen,
    post: PostScreen,
    othersProfile: ProfileScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
