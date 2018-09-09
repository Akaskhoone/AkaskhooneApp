import React from 'react';
import { connect } from 'react-redux';
import { selectors } from 'src/reducers';
import AuthScreens from './AuthScreens';
import MainScreens from './MainScreens';

const MainNavigator = props => (props.isLoggedIn ? <MainScreens /> : <AuthScreens />);

export default connect(state => ({
  isLoggedIn: selectors.isLoggedIn(state)
}))(MainNavigator);
