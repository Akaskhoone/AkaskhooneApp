import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './OthersProfileScreen';
import PostScreen from './PostScreen';
import SingleTagScreen from './SingleTagScreen';
import TabsScreen from './Tabs';

export default createStackNavigator(
  {
    tabs: TabsScreen,
    post: PostScreen,
    tag: SingleTagScreen,
    othersProfile: ProfileScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
