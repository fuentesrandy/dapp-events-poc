require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-ganache");
var secrets = require("secrets.js");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.0",
      },
    ],
  },
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      gasLimit: 6000000000,
      defaultBalanceEther: 10,
    },
    rinkeby: {
      url: `${secrets.Rinkeby_API_KEY}`,
      accounts: [`${secrets.Rinkeby_PRIVATE_KEY}`]
    }
  }
};