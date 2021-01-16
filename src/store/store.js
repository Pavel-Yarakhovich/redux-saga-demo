import { rootReducer } from './reducer';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

let store;
export default function configureStore(){
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  store = createStore(rootReducer, middlewares);
  sagaMiddleware.run(rootSaga);
  return store;
}
export function getStore() {
  return store;
}