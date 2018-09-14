import { NavigationState } from 'react-native';
import {
  NavigationActions,
  NavigationContainer,
  NavigationContainerComponent,
  StackActions
} from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { selectors } from 'src/reducers';
import { store } from 'src/store';

let _navigator;
function getCurrentRoute() {
  const routes = _navigator.state.nav.routes;
  const currentRoute = routes[routes.length - 1];
  return currentRoute;
}

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params?) {
  Reactotron.log('Navigating to', routeName, 'With params', params);
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function push(routeName, params?) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function navigateToProfile(username) {
  const state = store.getState();
  const ownerUsername = selectors.getOwner(state);
  if (!username) return;
  if (selectors.isOwner(state, username)) {
    navigateToOwnerProfile(ownerUsername);
  } else {
    push('othersProfile', { username });
  }
}
function navigateToOwnerProfile(ownerUsername) {
  const currentRoute = getCurrentRoute();
  if (currentRoute.routeName === 'tabs') navigate('profile');
  else push('othersProfile', { username: ownerUsername });
}

function navigateToPost(postId) {
  const currentRoute = getCurrentRoute();
  if (currentRoute.params && currentRoute.params.postId === postId) {
    return;
  }
  push('post', { postId });
}

export default {
  navigate,
  push,
  goBack,
  setTopLevelNavigator,
  navigateToPost,
  navigateToProfile
};
