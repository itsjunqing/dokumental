import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { POST } from "../../API";
import * as types from "../../store/ActionTypes";
import * as actHome from "./ac-Home";
import * as actResults from "../Results/ac-Results";

export function* sendDocuments({ history }) {
  const mockClassificationResults = [
    {
      id: "1",
      fileName: "post_graduate.txt",
      edu_level: "Postgraduate",
      reader_age: "22+",
    },
    {
      id: "2",
      fileName: "under_graduate.txt",
      edu_level: "Undergraduate",
      reader_age: "19-21",
    },
    {
      id: "3",
      fileName: "high_school.txt",
      edu_level: "High School",
      reader_age: "15-18",
    },
    {
      id: "4",
      fileName: "secondary_school.txt",
      edu_level: "Secondary School",
      reader_age: "14-15",
    },
    {
      id: "5",
      fileName: "elementary_school.txt",
      edu_level: "Elementary School",
      reader_age: "11-13",
    },
  ];
  try {
    const submittedFiles = yield select((state) => state.Home.submittedFiles);
    console.log("Start Saga submitted Files -> ", submittedFiles);
    yield put(actHome.handleState("isLoading", true));
    // TODO: Replace delay with call to API
    // yield delay(2000);
    let formData = new FormData();
    submittedFiles.forEach((n, i) => {
      formData.append(`file`, n)
    })

    // const header = {
    //   'Content-Type': 'multipart/form-data;',
    //   'Access-Control-Allow-Origin': 'https://dokumental.herokuapp.com/uploads/',
    //   'Access-Control-Allow-Credentials': 'true',
    // }
    // 
    const header = {
      'Content-Type': 'multipart/form-data;',
      'Access-Control-Allow-Origin': '*',
    }

    console.log("FORM DATA ", formData)
    // const results = yield call(
    //   POST,
    //   "http://localhost:8000/uploads/",
    //   formData,
    //   header
    // );
    // const results = yield call(
    //   POST,
    //   "https://dokumental.herokuapp.com/uploads/",
    //   formData,
    //   header
    // );
     
    console.log("End Saga");
    // console.log("Returned Results -> ", results);
    yield put(
      actResults.handleState("classificationResults", mockClassificationResults)
    );
    yield put(actHome.handleState("isLoading", false));
    yield put(actHome.handleState("isConfirmVisible", false));
    yield put(actHome.handleState("submittedFiles", []));
    history.push("/results");
    // Documents sent successfully
    yield put({ type: types.HOME_SEND_DOCUMENTS_SUCCESS });

  } catch (e) {
    yield put(actHome.handleState("isLoading", false));
    yield put(actHome.handleState("isConfirmVisible", false));
    yield put(actHome.handleState("isToastVisible", true));
    console.log(e);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.HOME_SEND_DOCUMENTS, sendDocuments)]);
}
