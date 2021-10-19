import { reduxConstants } from "../constants/reduxConstants";

export function alert(state = {}, action) {
  switch (action.type) {
    case reduxConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
      };
    case reduxConstants.ERROR:
      return {
        type: "alert-danger",
        message: action.message,
      };
    case reduxConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
