import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './OthersProfileScreen';
import PostScreen from './PostScreen';
import TabsScreen from './Tabs';
import TagScreen from './TagScreen';

export default createStackNavigator(
  {
    tabs: TabsScreen,
    post: PostScreen,
    tag: TagScreen,
    othersProfile: ProfileScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
