// scripts/deploy.js
const { ethers, upgrades } = require('hardhat');

async function main() {
    let contractName = "HelloWorld";
    const Contract1 = await ethers.getContractFactory(contractName);
    console.log(contractName + ' Deploying ...');
    const contract1 = await Contract1.deploy();
    await contract1.deployed();
    console.log(contractName + ' deployed to:', contract1.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });