const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat.config")
const { verify } = require("../helper-hardhat.config")
// const { verify } = require("../utils/verify")
const FUND_AMOUNT = "100000000000000000" //ethers.utils.parseEther("2")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subsciptionId

    if (developmentChains.includes(network.name)) {
        // const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        //  const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait(1)
        subscriptionId = transactionReceipt.events[0].args.subId // watch "how to work with events in hardhat" to know about this
        // Fund the subscription
        // Normally you fund the subscription with LINK token:
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    const entranceFee = networkConfig[chainId]["entranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"]

    const args = [
        vrfCoordinatorV2Address,
        entranceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        interval,
    ]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("-------Verifying.... Please Wait !-------------")
        await verify(raffle.address, args)
    }
    log("--------------------------------------------------------------------------------")
}
// module.exports.tags = ["all", "raffle"]
module.exports.tags = ["all", "raffle"]
