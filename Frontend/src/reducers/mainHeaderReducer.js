import { reduxConstants } from "../constants/reduxConstants";

const initialState = {
  typeaheadOutput: [],
  restaurantList: [],
  foodFilter: {},
  customerLocation: "",
  typeaheadSelected: [{}],
};

export function mainHeader(state = initialState, action) {
  switch (action.type) {
    case reduxConstants.TYPEAHEAD_OUTPUT:
      return {
        ...state,
        typeaheadOutput: action.data,
      };
    case reduxConstants.RESTAURANT_LIST:
      return {
        ...state,
        restaurantList: action.restList,
      };
    case reduxConstants.FOOD_FILTER:
      return {
        ...state,
        foodFilter: action.foodFil,
      };
    case reduxConstants.CUSTOMER_LOCATION:
      return {
        ...state,
        customerLocation: action.city,
      };
    case reduxConstants.TYPEAHEAD_SELECTED:
      return {
        ...state,
        typeaheadSelected: action.selected,
      };
    default:
      return state;
  }
}
