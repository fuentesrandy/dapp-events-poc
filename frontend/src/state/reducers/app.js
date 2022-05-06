import initialState from "../initalState"
import * as actionTypes from "../actionTypes/app"




export default function reducer(state = initialState.app, action) {
    switch (action.type) {

        case actionTypes.ACCOUNT_CHANGED:
            {
                return {
                    ...state,
                    currentAccount: action.payload
                }
            } break;
        case actionTypes.NETWORK_CHANGED:
            {
                return {
                    ...state,
                    chainId: action.payload
                }
            } break;
        default:
            return {
                ...state
            };
    }
}