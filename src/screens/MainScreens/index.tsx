import { createStackNavigator } from 'react-navigation';
import AddToBoard from './AddToBoard';
import ProfileScreen from './OthersProfileScreen';
import PostScreen from './PostScreen';
import SingleBoardScreen from './SingleBoardScreen';
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
