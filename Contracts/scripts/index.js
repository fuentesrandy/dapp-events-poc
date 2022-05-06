/*
To Run this file use the following cmd:
npx hardhat run scripts/index.js --network localhost
*/
async function main() {
    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);

    // Set up an ethers contract, representing our deployed Box instance
    const address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
    const MsgContractFactory = await ethers.getContractFactory('HelloWorld');
    const msgContract = await MsgContractFactory.attach(address);

    await msgContract.set("Hola");
    let value = await msgContract.get();
    console.log(value);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });