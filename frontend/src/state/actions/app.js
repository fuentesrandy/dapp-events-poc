import * as appActionTypes from "../actionTypes/app";

export const initApp = () => ({
    type: appActionTypes.BOOTSTRAP_APP
});

export const web3NotSupported = () => ({
    type: appActionTypes.WEB3_NOT_SUPPORTED
});

export const web3Supported = () => ({
    type: appActionTypes.WEB3_SUPPORTED
});

export const wrongNetwork = () => ({
    type: appActionTypes.WRONG_NETWORK
});

export const networkChanged = (payload) => ({
    type: appActionTypes.NETWORK_CHANGED,
    payload
});

export const accountChanged = (payload) => ({
    type: appActionTypes.ACCOUNT_CHANGED,
    payload
});

export const connectWallet = () => ({
    type: appActionTypes.CONNECT_WALLET
});

export const requestNetworkSwitch = (payload) => ({
    type: appActionTypes.REQUEST_NETWROK_SWITCH,
    payload
});