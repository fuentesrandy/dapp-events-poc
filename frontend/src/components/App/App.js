//
import './App.css';
//
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
//
import NoWalletDetected from "../NoWalletDetected"
import ConnectWallet from "../ConnectWallet"
import NetworkErrorMessage from "../NetworkErrorMessage"
import HelloWorldDapp from "../HelloWolrdDapp"
//
import * as AppActions from "../../state/actions/app"
import * as appSelectors from "../../state/selectors/app"
import Web3Provider from "../../services/web3Provider"

class App extends Component {

  state = {

  }
  //#region constructor
  constructor(props) {
    super(props);

    this._accountChanged = this._accountChanged.bind(this);
    this._subscribeNetworkChange = this._subscribeNetworkChange.bind(this);
  }
  //#endregion

  //#region Life Cycle
  componentDidMount() {
    const { initApp, isWeb3Supported } = this.props;
    initApp();

    if (isWeb3Supported) {
      this._registerWeb3Listners();
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.isWeb3Supported == false && this.props.isWeb3Supported == true) {
      this._registerWeb3Listners();
    }
    if (prevProps.isWeb3Supported == true && this.props.isWeb3Supported == false) {
      this._removeWeb3Listners();
    }
  }
  //#endregion

  _registerWeb3Listners() {
    let { provider, subscribeAccountsChanged, subscribeNetworkChange } = Web3Provider.getInstance();
    // register actions
    subscribeAccountsChanged(this._accountChanged);
    subscribeNetworkChange(this._subscribeNetworkChange);
  }

  _removeWeb3Listners() {
    let { provider, unsubscribeAccountsChanged, unsubscribeNetworkChange } = Web3Provider.getInstance();
    unsubscribeAccountsChanged(this._accountChanged);
    unsubscribeNetworkChange(this._subscribeNetworkChange);
  }

  _accountChanged(newAccount) {
    let { accountChanged } = this.props;
    accountChanged(newAccount)
  }

  _subscribeNetworkChange(networkId) {
    let { networkChanged } = this.props;
    networkChanged(networkId)
  }

  connectWallet() {
    let { connectWallet } = this.props;
    connectWallet();
  }

  dismissNetworkError() {

  }

  render() {
    let { isWeb3Supported, currentAccount } = this.props;
    if (isWeb3Supported == false) {
      return <NoWalletDetected />;
    }

    if (isWeb3Supported && !currentAccount) {
      return (
        <ConnectWallet
          connectWallet={() => this.connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this.dismissNetworkError()}
        />
      );
    }

    return (
      <div>
        <HelloWorldDapp />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let isWeb3Supported = appSelectors.isWeb3Supported(state);
  let currentAccount = appSelectors.currentAccount(state);
  return {
    isWeb3Supported,
    currentAccount
  };
}



const mapDispatchToProps = {
  initApp: AppActions.initApp,
  web3NotSupported: AppActions.web3NotSupported,
  accountChanged: AppActions.accountChanged,
  networkChanged: AppActions.networkChanged,
  connectWallet: AppActions.connectWallet
};

export default connect(
  mapStateToProps,
  { ...mapDispatchToProps }
)((App));

