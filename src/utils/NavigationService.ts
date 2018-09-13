import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { selectors } from 'src/reducers';
import { store } from 'src/store';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  Reactotron.log('Navigating to', routeName, 'With params', params);
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function navigateToProfile(username) {
  const state = store.getState();
  if (username === selectors.getOwner(state)) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'profile'
      })
    );
  } else {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'othersProfile',
        params: { username }
      })
    );
  }
}
// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigateToProfile
};
