import * as types from "../../store/ActionTypes";

export const handleState = (property, value) => {
  return {
    type: types.HOME_HANDLE_STATE,
    payload: {
      property,
      value,
    },
  };
};

export const toggleModal = (visibleProperty, messageProperty, message = "") => {
  return {
    type: types.HOME_TOGGLE_MODAL,
    payload: {
      visibleProperty,
      messageProperty,
      message,
    },
  };
};

export const sendDocuments = (history) => {
  return {
    type: types.HOME_SEND_DOCUMENTS,
    history,
  };
};
