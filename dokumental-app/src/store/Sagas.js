import { all } from "redux-saga/effects";
import Home from "../screens/Home/sa-Home";

export default function* rootSaga() {
  yield all([Home()]);
}
