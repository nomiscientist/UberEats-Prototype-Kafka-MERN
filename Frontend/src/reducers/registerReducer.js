import { reduxConstants } from '../constants/reduxConstants';

export function registration(state = {}, action) {
    switch (action.type) {
        case reduxConstants.REGISTER_REQUEST:
            return { registering: true };
        case reduxConstants.REGISTER_SUCCESS:
            return {};
        case reduxConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}