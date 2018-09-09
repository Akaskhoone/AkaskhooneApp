import { combineReducers } from '../../../node_modules/redux';
import tokensReducer from './tokens';

export default combineReducers({
  tokens: tokensReducer
});
