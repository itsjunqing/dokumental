import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./Reducers";

const appReducer = combineReducers({ ...reducers });

const store = createStore(appReducer);

export default store;
