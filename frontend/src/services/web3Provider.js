import { ethers } from "ethers";
export default class Web3Provider {
    static myInstance = null;
    provider = null;
    networkChangehandlers = [];  // observers
    accountChangehandlers = [];  // observers


    constructor(provider) {
        this.provider = provider;
        this.networkChangehandlers = [];  // observers
        this.accountChangehandlers = [];  // observers

        this.subscribeAccountsChanged = this.subscribeAccountsChanged.bind(this);
        this.unsubscribeAccountsChanged = this.unsubscribeAccountsChanged.bind(this);
        this.fireAccountsChanged = this.fireAccountsChanged.bind(this);
        this.subscribeNetworkChange = this.subscribeNetworkChange.bind(this);
        this.unsubscribeNetworkChange = this.unsubscribeNetworkChange.bind(this);
        this.fireNetworkChange = this.fireNetworkChange.bind(this);
    }

    static getInstance() {
        if (Web3Provider.myInstance == null) {
            Web3Provider.myInstance = new Web3Provider(new ethers.providers.Web3Provider(window.ethereum));

            window.ethereum.on("accountsChanged", async ([newAddress]) => {
                Web3Provider.myInstance.fireAccountsChanged(newAddress);
            });

            window.ethereum.on("networkChanged", ([networkId]) => {
                Web3Provider.myInstance.fireNetworkChange(networkId);
            });
        }
        return this.myInstance;
    }

    subscribeAccountsChanged(fn) {
        this.accountChangehandlers.push(fn);
    }

    unsubscribeAccountsChanged(fn) {
        this.accountChangehandlers = this.accountChangehandlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    fireAccountsChanged(o, thisObj) {
        var scope = thisObj || window;
        this.accountChangehandlers.forEach(function (item) {
            item.call(scope, o);
        });
    }

    subscribeNetworkChange(fn) {
        this.networkChangehandlers.push(fn);
    }

    unsubscribeNetworkChange(fn) {
        this.networkChangehandlers = this.networkChangehandlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    fireNetworkChange(o, thisObj) {
        var scope = thisObj || window;
        this.networkChangehandlers.forEach(function (item) {
            item.call(scope, o);
        });
    }
}