import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./Reducers";
import sagas from "./Sagas";

const sagaMiddleware = createSagaMiddleware();
const appReducer = combineReducers({ ...reducers });

const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

export default store;
