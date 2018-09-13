import actionTypes from './actionTypes';
import getActionsFor from './dataLoadingActionGenerator';
import Paginator from './Paginator';
import generateReducerFor, {
  Selector as SelectorInterface,
  selectors as paginatorSelectors
} from './reducerGenerator';

export default Paginator;
export { generateReducerFor, getActionsFor, paginatorSelectors, SelectorInterface, actionTypes };
