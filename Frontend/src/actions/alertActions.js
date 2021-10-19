import { reduxConstants } from "../constants/reduxConstants";

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: reduxConstants.SUCCESS, message };
}

function error(message) {
  return { type: reduxConstants.ERROR, message };
}

function clear() {
  return { type: reduxConstants.CLEAR };
}
