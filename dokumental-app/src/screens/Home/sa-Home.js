import { all, call, delay, put, takeLatest, select } from "redux-saga/effects";
import * as types from "../../store/ActionTypes";
import * as actHome from "./ac-Home";

export function* sendDocuments({ history }) {
  try {
    const submittedFiles = yield select((state) => state.Home.submittedFiles);
    console.log("Start Saga submitted Files -> ", submittedFiles);
    yield put(actHome.handleState("isLoading", true));
    // TODO: Replace delay with call to API
    yield delay(2000);

    console.log("End Saga");
    yield put(actHome.handleState("isLoading", false));
    yield put(actHome.handleState("isConfirmVisible", false));
    yield put(actHome.handleState("submittedFiles", []));
    history.push("/results");
    // Documents sent successfully
    yield put({ type: types.HOME_SEND_DOCUMENTS_SUCCESS });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.HOME_SEND_DOCUMENTS, sendDocuments)]);
}
