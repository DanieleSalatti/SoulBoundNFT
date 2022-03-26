//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import "./SoulBoundNFT.sol";

contract SoulBoundNFTFactory {
  //===== State =====//

  struct ContractInfo {
    string name;
    string symbol;
    string organization;
    bool transferable;
    address owner;
  }

  address[] public proxies;

  mapping(address => address[]) ownerToProxyAddress;
  mapping(address => ContractInfo) proxyAddressToContractInfo;

  //===== Events =====//

  event SoulBoundCreated(address proxyAddress, string name, string symbol, string organization, bool transferable, address owner);

  event UpgradeableBeaconCreated(address indexed createdBy, UpgradeableBeacon beacon, address initialImplementation);
  event BeaconProxyCreated(UpgradeableBeacon indexed beacon, BeaconProxy beaconProxy);

  function payload(
    string memory name,
    string memory symbol,
    string memory organization,
    bool transferable,
    address tokenOwner
  ) public pure returns (bytes memory) {
    return abi.encodeWithSignature("initialize(string,string,string,bool,address)", name, symbol, organization, transferable, tokenOwner);
  }

  /// newUpgradeableBeacon creates a new beacon with an initial implementation set
  /// @param initialImplementation sets the first iteration of logic for proxies
  // TODO(0xDarni): this function address should be restricted
  function newUpgradeableBeacon(address initialImplementation) public returns (UpgradeableBeacon) {
    UpgradeableBeacon beacon = new UpgradeableBeacon(initialImplementation);
    beacon.transferOwnership(msg.sender);

    emit UpgradeableBeaconCreated(msg.sender, beacon, initialImplementation);

    return beacon;
  }

  /// newBeaconProxy creates and initializes a new proxy for the given UpgradeableBeacon
  /// @param beacon is address of the beacon
  function newBeaconProxy(
    UpgradeableBeacon beacon,
    string memory name,
    string memory symbol,
    string memory organization,
    bool transferable,
    address tokenOwner
  ) public returns (BeaconProxy) {
    bytes memory data = payload(name, symbol, organization, transferable, tokenOwner);
    BeaconProxy beaconProxy = new BeaconProxy(address(beacon), data);

    ownerToProxyAddress[tokenOwner].push(address(beacon));

    proxyAddressToContractInfo[address(beacon)] = ContractInfo({
      name: name,
      symbol: symbol,
      organization: organization,
      transferable: transferable,
      owner: tokenOwner
    });

    proxies.push(address(beaconProxy));

    emit BeaconProxyCreated(beacon, beaconProxy);

    emit SoulBoundCreated(address(beaconProxy), name, symbol, organization, transferable, tokenOwner);

    return beaconProxy;
  }

  function getProxiesByOwnerAddress(address _owner) public view returns (address[] memory) {
    return ownerToProxyAddress[_owner];
  }

  function getContractInfoByProxyAddress(address _proxy) public view returns (ContractInfo memory) {
    return proxyAddressToContractInfo[_proxy];
  }
}
