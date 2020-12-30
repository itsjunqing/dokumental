import * as types from "../../store/ActionTypes";

const initialState = {
  classificationResults: [],
};
const ResultsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.RESULTS_HANDLE_STATE:
      return {
        ...state,
        [payload.property]: payload.value,
      };

    default:
      return state;
  }
};
export default ResultsReducer;
