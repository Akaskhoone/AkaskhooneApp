import { createStackNavigator } from 'react-navigation';
import FirstSearchScreen from './FirstSearchScreen';
import SecondSearchScreen from './SecondSearchScreen';

const searchStack = createStackNavigator(
  {
    firstSearch: FirstSearchScreen,
    secondSearch: SecondSearchScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

searchStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0
});
export default searchStack;
