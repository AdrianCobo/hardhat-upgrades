// manual way

const { ethers } = require("hardhat")

async function main() {
    const BoxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const tranparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBoxV1 = await ethers.getContractAt("Box", tranparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log(versionV1)

    const boxv2 = await ethers.getContract("BoxV2")
    const upgradeTx = await BoxProxyAdmin.upgrade(tranparentProxy.address, boxv2.address)
    await upgradeTx.wait(1)

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", tranparentProxy.address) //abi del contrato BoxV2 pero con el addres del proxy
    const versionV2 = await proxyBoxV2.version()
    console.log(versionV2)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
