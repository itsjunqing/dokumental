import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import * as types from "../../store/ActionTypes";

export function* sendDocuments(action) {
  try {
    console.log("Start Saga");
    // TODO: Replayce delay with call to API
    yield delay(500);
    console.log("End Saga");
    // Documents sent successfully
    yield put({ type: types.HOME_SEND_DOCUMENTS_SUCCESS });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.HOME_SEND_DOCUMENTS, sendDocuments)]);
}
