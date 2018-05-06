import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import { data, user } from './../reducers';
import rootSaga from './../sagas';


var devTools;

if ((process.env.NODE_ENV === 'prod' || process.env.NODE_ENV ===
		'production') || !window.__REDUX_DEVTOOLS_EXTENSION__) {
	devTools = a => a;
} else {
	devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__();
}

const rootReducer = combineReducers({
    user,
    data,
	routing: routerReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(sagaMiddleware),
		devTools,
	),
);

store.close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);

export default store;