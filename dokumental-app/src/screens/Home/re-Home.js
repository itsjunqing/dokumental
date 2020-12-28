import * as types from "../../store/ActionTypes";

const initialState = {
  isErrorVisible: false,
  errorMsg: "Placeholder",
  submittedFiles: [],
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HOME_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    case types.HOME_TOGGLE_MODAL:
      return {
        ...state,
        [payload.property]: !state[payload.property],
        errorMsg: payload.message,
      };

    default:
      return state;
  }
};

export default HomeReducer
