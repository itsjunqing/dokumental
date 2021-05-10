import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { POST } from "../../API";
import * as types from "../../store/ActionTypes";
import * as actHome from "./ac-Home";
import * as actResults from "../Results/ac-Results";

export function* sendDocuments({ history }) {
  const mockClassificationResults = [
    {
      name: "library_16.pdf",
      level: "Middle School",
      percentages: [22.64, 62.6, 10.34, 4.41],
    },
    {
      name: "acs.jafc.8b07023.pdf",
      level: "Undergraduate",
      percentages: [1.5, 6.89, 39.32, 52.29],
    },
    {
      name: "Mu\u0308ller2018_Article_Sim4CVAPhoto-RealisticSimulato.pdf",
      level: "High School",
      percentages: [0.98, 5.04, 55.31, 38.66],
    },
    {
      name: "exsy.12644.pdf",
      level: "Undergraduate",
      percentages: [0.7, 3.97, 20.61, 74.72],
    },
    {
      name: "adma.201603917.pdf",
      level: "Undergraduate",
      percentages: [0.47, 2.4, 27.77, 69.36],
    },
    {
      name: "Lakovschek2019_Article_ARareCaseOfCancer-to-cancerMet.pdf",
      level: "Middle School",
      percentages: [13.92, 43.28, 36.33, 6.47],
    },
    {
      name:
        "The use of machine learning black boxes explanation systems to improve the quality of school education.pdf",
      level: "Middle School",
      percentages: [11.02, 35.88, 26.07, 27.03],
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
    const results = yield call(
      POST,
      "http://localhost:8000/uploads/",
      formData,
      header
    );
    // const results = yield call(
    //   POST,
    //   "https://dokumental.herokuapp.com/uploads/",
    //   formData,
    //   header
    // );
     
    console.log("End Saga",);
    console.log("Returned Results -> ", results);
    yield put(
      actResults.handleState("classificationResults", results.data)
    );
    // yield put(
    //   actResults.handleState("classificationResults", mockClassificationResults)
    // );
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
