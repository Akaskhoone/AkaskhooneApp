import React from 'react';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import NavigationService from 'src/utils/NavigationService';
import AuthScreens from './AuthScreens';
import MainScreens from './MainScreens';

const MainNavigator = props =>
  props.isLoggedIn ? (
    <MainScreens ref={navigator => NavigationService.setTopLevelNavigator(navigator)} />
  ) : (
    <AuthScreens />
  );

export default connect(state => ({
  isLoggedIn: selectors.isLoggedIn(state)
}))(MainNavigator);
