
import { ethers, EventFilter, utils } from "ethers";
import dotenv from "dotenv";


import contractAddresses from "./contracts/addresess.json";
import HelloWorldAbi from "./contracts/HelloWorld.json";




async function main() {
    try {
        console.log("Starting!!");

        // initialize configuration
        dotenv.config();



        const webSocketProvider = new ethers.providers.JsonRpcProvider(process.env.EVM_NODE_URL);
        const contract = new ethers.Contract(contractAddresses.HelloWorld, HelloWorldAbi, webSocketProvider);

        let eventFilter: EventFilter = {
            address: "*",
            topics: [
                utils.id("MessageSet(address,bytes32)")
            ]
        }
        const events = await contract.queryFilter(eventFilter, "earliest", "latest")
        events.map(x => printEventData(x))
        contract.on("MessageSet", (from, to, value) => {
            printEventData(value);
        });

    } catch (ex) {

        console.log("ERROR!!!!!")
        console.log(ex)
    }
}

function printEventData(eventData: any) {
    try {
        let value = ethers.utils.parseBytes32String(`${eventData.args._msg}`);
        console.log({
            transactionHash: eventData.transactionHash,
            from: eventData.args._from,
            rawMsg: eventData.args._msg,
            msg: value
        })
    }
    catch (ex) { }
}

main().then();

