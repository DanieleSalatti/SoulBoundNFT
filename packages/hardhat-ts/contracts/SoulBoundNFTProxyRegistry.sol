//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBoundNFTProxyRegistry is Ownable {
  using Counters for Counters.Counter;

  //===== State =====//

  Counters.Counter public proxyCount;

  struct ContractInfo {
    string name;
    string symbol;
    string organization;
    address owner;
  }

  address public beaconAddress;
  address[] public proxies;

  mapping(address => address[]) ownerToProxyAddress;
  mapping(address => ContractInfo) proxyAddressToContractInfo;

  address public proxyFactory;

  constructor() {}

  /// newBeaconProxy creates and initializes a new proxy for the given UpgradeableBeacon
  function registerBeaconProxy(
    address proxyAddress,
    string memory name,
    string memory symbol,
    string memory organization,
    address tokenOwner
  ) public onlyProxyFactory {
    ownerToProxyAddress[tokenOwner].push(proxyAddress);

    proxyAddressToContractInfo[proxyAddress] = ContractInfo({ name: name, symbol: symbol, organization: organization, owner: tokenOwner });

    proxies.push(proxyAddress);

    proxyCount.increment();
  }

  function getProxiesByOwnerAddress(address _owner) public view returns (address[] memory) {
    return ownerToProxyAddress[_owner];
  }

  function getContractInfoByProxyAddress(address _proxy) public view returns (ContractInfo memory) {
    return proxyAddressToContractInfo[_proxy];
  }

  function setBeaconAddress(address _beaconAddress) public onlyProxyFactory {
    beaconAddress = _beaconAddress;
  }

  function setProxyFactory(address _factory) public onlyOwner {
    proxyFactory = _factory;
  }

  modifier onlyProxyFactory() {
    require(msg.sender == proxyFactory, "Not allowed");
    _;
  }
}
