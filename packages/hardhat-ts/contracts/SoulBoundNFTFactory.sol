//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./SoulBoundNFT.sol";

contract SoulBoundNFTFactory is Ownable {
  //===== State =====//

  struct ContractInfo {
    string name;
    string symbol;
    string organization;
    bool transferable;
    address owner;
  }

  address public beaconAddress;
  address[] public proxies;

  mapping(address => address[]) ownerToProxyAddress;
  mapping(address => ContractInfo) proxyAddressToContractInfo;

  //===== Events =====//

  event SoulBoundCreated(address proxyAddress, string name, string symbol, string organization, bool transferable, address owner);

  event UpgradeableBeaconCreated(address indexed createdBy, address beacon, address initialImplementation);
  event BeaconProxyCreated(address indexed beacon, address beaconProxy);

  constructor() {}

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
  function newUpgradeableBeacon(address initialImplementation) public onlyOwner returns (UpgradeableBeacon beacon) {
    beacon = new UpgradeableBeacon(initialImplementation);
    beacon.transferOwnership(msg.sender);

    emit UpgradeableBeaconCreated(msg.sender, address(beacon), initialImplementation);

    beaconAddress = address(beacon);
  }

  /// newBeaconProxy creates and initializes a new proxy for the given UpgradeableBeacon
  function newBeaconProxy(
    string memory name,
    string memory symbol,
    string memory organization,
    bool transferable,
    address tokenOwner
  ) public returns (BeaconProxy beaconProxy) {
    bytes memory data = payload(name, symbol, organization, transferable, tokenOwner);

    beaconProxy = new BeaconProxy(beaconAddress, data);

    ownerToProxyAddress[tokenOwner].push(address(beaconProxy));

    proxyAddressToContractInfo[address(beaconProxy)] = ContractInfo({
      name: name,
      symbol: symbol,
      organization: organization,
      transferable: transferable,
      owner: tokenOwner
    });

    proxies.push(address(beaconProxy));

    emit BeaconProxyCreated(beaconAddress, address(beaconProxy));

    emit SoulBoundCreated(address(beaconProxy), name, symbol, organization, transferable, tokenOwner);
  }

  function getProxiesByOwnerAddress(address _owner) public view returns (address[] memory) {
    return ownerToProxyAddress[_owner];
  }

  function getContractInfoByProxyAddress(address _proxy) public view returns (ContractInfo memory) {
    return proxyAddressToContractInfo[_proxy];
  }
}
