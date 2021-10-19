import { reduxConstants } from '../constants/reduxConstants';

const initialState = {deliveryType : "delivery"};

export function order(state = initialState, action) {
    switch (action.type) {
        case reduxConstants.ORDER_DELIVERY_TYPE:
            return {
                ...state,
                deliveryType: action.value
            };
        default:
            return state
    }
}