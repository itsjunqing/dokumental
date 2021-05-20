import * as types from "../../store/ActionTypes";

const initialState = {
  isLoading: false,
  isErrorVisible: false,
  isConfirmVisible: false,
  isToastVisible: false,
  toastMsg: "Failed to upload documents, please try again",
  errorMsg: "Placeholder",
  confirmMsg: "Placeholder",
  submittedFiles: [],
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HOME_HANDLE_STATE:
      return { ...state, [payload.property]: payload.value };

    case types.HOME_TOGGLE_MODAL:
      const { visibleProperty, messageProperty, message } = payload;
      return {
        ...state,
        [visibleProperty]: !state[visibleProperty],
        [messageProperty]: message,
      };

    default:
      return state;
  }
};

export default HomeReducer;
