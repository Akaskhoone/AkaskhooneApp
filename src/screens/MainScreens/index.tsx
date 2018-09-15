import { createStackNavigator } from 'react-navigation';
import AddToBoard from './AddToBoard';
import ProfileScreen from './OthersProfileScreen';
import SingleBoardScreen from './SingleBoardScreen';
import PostScreen from './SinglePostScreen';
import SingleTagScreen from './SingleTagScreen';
import TabsScreen from './Tabs';

export default createStackNavigator(
  {
    tabs: TabsScreen,
    post: PostScreen,
    tag: SingleTagScreen,
    board: SingleBoardScreen,
    addToBoard: AddToBoard,
    othersProfile: ProfileScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
