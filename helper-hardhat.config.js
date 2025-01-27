const { ethers } = require("hardhat")
// const { developmentChains } = require("../helper-hardhat-config")
const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entranceFee: "100000000000000000", //ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "797",
        callbackGasLimit: "500,000",
        interval: "30",
    },
    31337: {
        name: "hardhat",
        entranceFee: "100000000000000000", //ethers.utils.parseEther("0.01"),
        gasLane: "blablabla",
        callbackGasLimit: "500,000",
        interval: "30",
    },
}
const developmentChains = ["hardhat", "localhost"]
//const DECIMALS = 8 // impored from "MockV3Aggregator.sol", it is a "constructor" function arguments and a function as well
//const INITIAL_ANSWER = 200000000000 // the INITIAL ANSWER is starting at 2000 and 8 zeroes after that
module.exports = {
    networkConfig,
    developmentChains,
}
// subscriptionID: ID 797
