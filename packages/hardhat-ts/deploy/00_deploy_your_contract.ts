import { assert } from 'console';

import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const OWNER_ADDRESS = '0x523d007855B3543797E0d3D462CB44B601274819'; // 0xDarni

  const sbDeploymnet = await deploy('SoulBoundNFT', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  const sbFactoryDeployment = await deploy('SoulBoundNFTFactory', {
    from: deployer,
    log: true,
  });

  const sbFactory = await ethers.getContractAt('SoulBoundNFTFactory', sbFactoryDeployment.address);

  const upgradeableBeaconTx = await sbFactory.newUpgradeableBeacon(sbDeploymnet.address);

  const tx = await upgradeableBeaconTx.wait();
  const topic = sbFactory.interface.getEventTopic('UpgradeableBeaconCreated');

  /* eslint-disable */
  const [beaconAddr] = tx.logs
    .filter((log: { topics: any[] }) => log.topics.find((t) => t === topic))
    .map((log: { data: BytesLike }) => sbFactory.interface.decodeEventLog('UpgradeableBeaconCreated', log.data))
    .map((d: any) => {
      console.log('UpgradeableBeaconCreated', d);
      return d;
    })
    .map((event: any[]) => event[1]);

  console.log('upgradeableBeacon deployed to', beaconAddr);

  const UpgradeableBeacon = await ethers.getContractFactory('UpgradeableBeacon');
  const upgradeableBeacon = UpgradeableBeacon.attach(beaconAddr);

  assert((await upgradeableBeacon.implementation()) == sbDeploymnet.address, 'Address of implementation is not correct');

  await sbFactory.transferOwnership(OWNER_ADDRESS);
  await upgradeableBeacon.transferOwnership(OWNER_ADDRESS);
};
export default func;
func.tags = ['SoulBoundNFT', 'SoulBoundNFTFactory'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
