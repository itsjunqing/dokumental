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

export const toggleModal = (property, message = "") => {
  return {
    type: types.HOME_TOGGLE_MODAL,
    payload: {
      property,
      message,
    },
  };
};
