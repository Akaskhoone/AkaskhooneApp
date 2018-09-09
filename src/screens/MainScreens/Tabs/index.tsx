import TabBar from '@components/TabBar';
import MyIcon from '@elements/Icon';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import AddPostScreen from './AddPostScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';

export default createBottomTabNavigator(
  {
    profile: ProfileScreen,
    notification: NotificationScreen,
    addPost: AddPostScreen,
    search: SearchScreen,
    home: HomeScreen
  },
  {
    tabBarComponent: TabBar,
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: prop => {
        if (navigation.state.key === 'addPost') return;
        (prop as any).defaultHandler();
      },
      tabBarIcon: ({ tintColor, focused }) => {
        let iconName = '';
        switch (navigation.state.key) {
          case 'home':
            iconName = `home`;
            break;
          case 'notification':
            iconName = `notification`;
            break;
          case 'search':
            iconName = `search`;
            break;
          case 'profile':
            iconName = `profile`;
            break;
          case 'addPost':
            return null;
        }
        return <MyIcon color={tintColor} name={iconName} size={24} />;
      }
    }),
    tabBarOptions: {
      showLabel: false
    },
    lazy: true
  }
);
