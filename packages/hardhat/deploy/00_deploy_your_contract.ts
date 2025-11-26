import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "RaiseChainContract" using the deployer account.
 * (No constructor arguments are passed based on the latest error.)
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployRaiseChainContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the contract without passing any constructor arguments
  const deployResult = await deploy("RaiseChainContract", {
    from: deployer,
    // THE FIX: Removed the 'args' property to solve "expected 0 constructor arguments, got 1"
    // args: [deployer], 
    log: true,
    autoMine: true,
  });
  
  console.log(`RaiseChainContract deployed to: ${deployResult.address}`);

  // Get the deployed contract instance
  if (deployResult.newlyDeployed) {
      const raiseChainContract = await hre.ethers.getContract<Contract>("RaiseChainContract", deployer);
      // Example of interacting with the deployed contract:
      // console.log("👋 Initial state:", await raiseChainContract.someStateVariable());
  }
};

export default deployRaiseChainContract;

deployRaiseChainContract.tags = ["RaiseChainContract"];