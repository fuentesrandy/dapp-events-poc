// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
//https://chainlist.org/
// 0x1,  1	Mainnet
// 0x4, 4	Rinkeby
// 0xa86a, 43114	Avalanche

const networks = {
    Mainnet: {
        id: '1',
        hex: '0x1',
    },
    Rinkeby: {
        id: '4',
        hex: '0x4',
    },
    Avalanche: {
        id: '43114',
        hex: '0xa86a',
        rpc: 'https://rpc.ankr.com/avalanche'
    }
}
export const DefaultNetwork = networks.Rinkeby;

export const NETWORK_ID = DefaultNetwork.id;
export const NETWORK_HEX = DefaultNetwork.hex;


// This is an error code that indicates that the user canceled a transaction
export const ERROR_CODE_REJECTED_BY_USER = 4001;
// This error code indicates that the chain has not been added to MetaMask
export const ERROR_CODE_CHAIN_MISSING_FROM_WALLET = 4902;