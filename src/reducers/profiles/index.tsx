import { generateSelector } from '@utils/helpers';
import { combineReducers } from '../../../node_modules/redux';

import othersProfileReducer, { selectors as othersProfileSelectors } from './others';
import ownProfileReducer from './own';
export default combineReducers({
  others: othersProfileReducer,
  own: ownProfileReducer
});

export const selectors = {
  ...generateSelector(othersProfileSelectors, state => state.others)
} as any;
