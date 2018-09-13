import HomeScreen from '@screens/MainScreens/Tabs/HomeScreen';
import { createStackNavigator } from 'react-navigation';
import AddPostScreen from './AddPostScreen';
import PostInfoScreen from './PostInfoScreen';

const PostStackNavigator = createStackNavigator(
  {
    addPost: AddPostScreen,
    postInfo: PostInfoScreen,
    home: HomeScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
PostStackNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: false
});
export default PostStackNavigator;
