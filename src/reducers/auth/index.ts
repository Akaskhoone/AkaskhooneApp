import { combineReducers } from 'redux';
import ownProfileReducer from './ownProfile';
import tokensReducer from './tokens';

export default combineReducers({
  tokens: tokensReducer,
  ownProfile: ownProfileReducer
});
