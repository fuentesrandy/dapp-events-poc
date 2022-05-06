const initialState = {
    app: {
        isWeb3Supported: window.ethereum != undefined,
        chainId: (window.ethereum ? window.ethereum.networkVersion : undefined),
        currentAccount: (window.ethereum ? window.ethereum.selectedAddress : undefined)
    }
}

export default initialState;

