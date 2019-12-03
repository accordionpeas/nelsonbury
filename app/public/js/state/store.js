import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import isServer from '../utils/is-server';

const getMiddleware = () => {
  const middlewares = [thunkMiddleware];

  if (!isServer && process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  return middlewares;
};

const createStore = (initialState = {}) => (
  createReduxStore(
    reducer,
    initialState,
    applyMiddleware(...getMiddleware()),
  )
);

export default createStore;
