
import { put, takeEvery, takeLatest, call, select, take } from "redux-saga/effects";
import * as actionTypes from "../actionTypes/app";
import * as actions from "../actions/app"
import { NETWORK_ID, NETWORK_HEX, ERROR_CODE_CHAIN_MISSING_FROM_WALLET, ERROR_CODE_REJECTED_BY_USER } from "../../utils/conts"
import Web3Provider from "../../services/web3Provider"
import * as selectors from "../selectors/app"

function* onBootstrapApp(action) {

    let isWeb3Supported = yield select(selectors.isWeb3Supported);
    if (isWeb3Supported) {
        yield put(actions.web3Supported());

        let currentAccount = yield select(selectors.currentAccount);
        let { provider } = Web3Provider.getInstance();
        const network = yield provider.getNetwork();

        yield put(actions.networkChanged(network.chainId));


    } else {

        yield put(actions.web3NotSupported());
    }
}

function* onAccountChanged(action) {
    let { provider } = Web3Provider.getInstance();
    const network = yield provider.getNetwork();

    if (network.chainId != NETWORK_ID) {
        yield put(actions.requestNetworkSwitch(NETWORK_HEX));
    }
}

function* onNetworkChanged(action) {

    if (action.payload == null) {
        yield put(actions.connectWallet());
    }
    else if (action.payload != NETWORK_ID) {
        yield put(actions.wrongNetwork());
    } else {
        let currentAccount = yield select(selectors.currentAccount);
        if (currentAccount === null) {
            yield put(actions.connectWallet());
        }
    }
}

function* onConnectWallet(action) {

    try {

        let { provider } = Web3Provider.getInstance();

        const [selectedAddress] = yield provider.send("eth_requestAccounts", []);
        yield put(actions.accountChanged(selectedAddress));

    } catch (error) {

        console.log(error)
        if (error && error.code == ERROR_CODE_REJECTED_BY_USER) {
            //User rejected the request.
        }
    }
}

function* onWrongNetworkDetected() {
    yield put(actions.requestNetworkSwitch(NETWORK_HEX));
}

function* onRequestNetworkSwitch(action) {

    try {
        let { provider } = Web3Provider.getInstance();
        yield provider.send('wallet_switchEthereumChain', [{ chainId: action.payload }]);

    } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === ERROR_CODE_CHAIN_MISSING_FROM_WALLET) {
            // try {
            //     await window.ethereum.request({
            //         method: 'wallet_addEthereumChain',
            //         params: [
            //             {
            //                 chainId: '0x61',
            //                 rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            //             },
            //         ],
            //     });
            // } catch (addError) {
            //     console.error(addError);
            // }
        } else if (error.code === ERROR_CODE_REJECTED_BY_USER) {

        }
        console.error(error);
    }
}

export default function* apiWatcher() {
    yield takeLatest(actionTypes.BOOTSTRAP_APP, onBootstrapApp);
    yield takeLatest(actionTypes.ACCOUNT_CHANGED, onAccountChanged);
    yield takeLatest(actionTypes.NETWORK_CHANGED, onNetworkChanged);
    yield takeLatest(actionTypes.CONNECT_WALLET, onConnectWallet);
    yield takeLatest(actionTypes.WRONG_NETWORK, onWrongNetworkDetected);
    yield takeLatest(actionTypes.REQUEST_NETWROK_SWITCH, onRequestNetworkSwitch);

}



