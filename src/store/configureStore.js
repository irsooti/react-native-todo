import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import stuffReducer from '../features/Stuff/reducers/stuff';
import accountReducer from '../features/Account/reducers/account';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
  stuff: stuffReducer,
  account: accountReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
  );
};

export default configureStore;
