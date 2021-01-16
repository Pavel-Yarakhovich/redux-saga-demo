import { demoReducer } from './demo/demoReducer';
import { combineReducers } from 'redux';
import { CLEAR_STORE } from './demo/demoActions';

export const appReducer = combineReducers({
  demo: demoReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};