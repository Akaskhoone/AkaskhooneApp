import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import AddPostButton from './AddPostButton';

export default props => {
  const navigateTo = name => () => props.navigation.navigate(name);
  return (
    <View>
      <BottomTabBar {...props} />
      <AddPostButton onPress={navigateTo('addPost')} />
    </View>
  );
};
