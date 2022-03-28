//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 *
 * SoulBoundNFT
 *
 * Based on Membership NFTs by Ezra Weller and R Group, working with Rarible DAO
 *
 */

contract SoulBoundNFT is Initializable, AccessControlUpgradeable, ERC721VotesUpgradeable, ERC721BurnableUpgradeable, PausableUpgradeable, UUPSUpgradeable {
  using Counters for Counters.Counter;
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  //===== Interfaces =====//

  struct TokenData {
    uint256 id;
    address owner;
    address mintedTo;
    string nickName;
    string role;
    string organization;
    string tokenName;
  }

  struct TokenURIParams {
    uint256 id;
    address owner;
    string nickName;
    string role;
    string organization;
    string tokenName;
  }

  struct TokenOwnerInfo {
    string nickName;
    string role;
  }

  //===== State =====//
  Counters.Counter internal _counter;

  address payable devVault;

  string internal _organization;
  string internal _defaultRole;
  bool internal _transferable;
  bool internal _mintable;
  uint256 internal _mintPrice;

  address internal _vault;

  string internal svgLogo;

  mapping(uint256 => TokenOwnerInfo) internal _tokenOwnerInfo;
  mapping(uint256 => address) internal _mintedTo;

  //===== Events =====//

  event ToggleTransferable(bool transferable);
  event ToggleMintable(bool mintable);

  //===== Initializer =====//

  /// @custom:oz-upgrades-unsafe-allow constructor
  // `initializer` marks the contract as initialized to prevent third parties to
  // call the `initialize` method on the implementation (this contract)
  constructor() initializer {}

  function initialize(
    string memory name_,
    string memory symbol_,
    string memory organization_,
    string memory defaultRole_,
    bool transferable_,
    bool mintable_,
    uint256 mintPrice_,
    address ownerOfToken
  ) public initializer {
    __ERC721_init(name_, symbol_);
    __AccessControl_init();

    devVault = payable(address(0xf4553cDe05fA9FC35F8F1B860bAC7FA157779382));

    _organization = organization_;
    _defaultRole = defaultRole_;
    _transferable = transferable_;
    _mintable = mintable_;
    _mintPrice = mintPrice_;

    _vault = ownerOfToken;

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(UPGRADER_ROLE, msg.sender);

    _grantRole(DEFAULT_ADMIN_ROLE, ownerOfToken);
    _grantRole(PAUSER_ROLE, ownerOfToken);
    _grantRole(MINTER_ROLE, ownerOfToken);
  }

  //===== External Functions =====//
  fallback() external payable {
    return;
  }

  receive() external payable {
    return;
  }

  function batchMint(
    address[] calldata toAddresses,
    string[] calldata nickNames,
    string[] calldata roles
  ) external onlyRole(MINTER_ROLE) whenNotPaused {
    require(toAddresses.length == nickNames.length, "SoulBoundNFT: Array length mismatch");
    require(toAddresses.length == roles.length, "SoulBoundNFT: Array length mismatch");

    for (uint256 i = 0; i < toAddresses.length; i++) {
      _mint(toAddresses[i], nickNames[i], roles[i]);
    }
  }

  function burn(uint256 tokenId) public override(ERC721BurnableUpgradeable) exists(tokenId) onlyMinterOrTokenOwner(tokenId) {
    _burn(tokenId);
  }

  function setSvgLogo(string calldata _svgLogo) public onlyRole(MINTER_ROLE) {
    svgLogo = _svgLogo;
  }

  function batchBurn(uint256[] calldata tokenIds) external onlyRole(MINTER_ROLE) {
    for (uint256 i = 0; i < tokenIds.length; i++) {
      require(_exists(tokenIds[i]), "SoulBoundNFT: Non-existent token");
      burn(tokenIds[i]);
    }
  }

  function toggleTransferable() external onlyRole(PAUSER_ROLE) returns (bool) {
    if (_transferable) {
      _transferable = false;
    } else {
      _transferable = true;
    }
    emit ToggleTransferable(_transferable);
    return _transferable;
  }

  function toggleMintable() external onlyRole(MINTER_ROLE) returns (bool) {
    if (_mintable) {
      _mintable = false;
    } else {
      _mintable = true;
    }
    emit ToggleMintable(_mintable);
    return _mintable;
  }

  function setMintPrice(uint256 mintPrice_) external onlyRole(MINTER_ROLE) {
    _mintPrice = mintPrice_;
  }

  function setDefaultRole(string memory defaultRole_) external onlyRole(MINTER_ROLE) {
    _defaultRole = defaultRole_;
  }

  //===== Public Functions =====//

  function version() public pure returns (uint256) {
    return 1;
  }

  function mint(
    address to,
    string calldata nickName,
    string calldata role
  ) public payable whenNotPaused {
    // MINTER_ROLE can mint for free - gifting memberships
    // Otherwise users have to pay
    if (_mintable && !hasRole(MINTER_ROLE, msg.sender)) {
      require(msg.value >= _mintPrice, "SoulBoundNFT: insufficient funds!");
      _mint(to, nickName, _defaultRole);
    } else {
      require(hasRole(MINTER_ROLE, msg.sender), "SoulBoundNFT: not allowed to mint!");
      _mint(to, nickName, role);
    }
  }

  function organization() public view returns (string memory) {
    return _organization;
  }

  function defaultRole() public view returns (string memory) {
    return _defaultRole;
  }

  function transferable() public view returns (bool) {
    return _transferable;
  }

  function mintable() public view returns (bool) {
    return _mintable;
  }

  function mintPrice() public view returns (uint256) {
    return _mintPrice;
  }

  function mintedTo(uint256 tokenId) public view returns (address) {
    return _mintedTo[tokenId];
  }

  function nickNameOf(uint256 tokenId) public view returns (string memory) {
    return _tokenOwnerInfo[tokenId].nickName;
  }

  function roleOf(uint256 tokenId) public view returns (string memory) {
    return _tokenOwnerInfo[tokenId].role;
  }

  function nextId() public view returns (uint256) {
    return _counter.current();
  }

  function tokenDataOf(uint256 tokenId) public view returns (TokenData memory) {
    TokenData memory tokenData = TokenData(tokenId, ownerOf(tokenId), mintedTo(tokenId), nickNameOf(tokenId), roleOf(tokenId), organization(), name());
    return tokenData;
  }

  function tokenURI(uint256 tokenId) public view override exists(tokenId) returns (string memory) {
    TokenURIParams memory params = TokenURIParams(tokenId, mintedTo(tokenId), nickNameOf(tokenId), roleOf(tokenId), organization(), name());
    return constructTokenURI(params);
  }

  function withdraw() public {
    uint256 devFee = (address(this).balance / 100) * 1;
    (bool donation, ) = devVault.call{ value: devFee }("");
    require(donation);

    (bool release, ) = payable(_vault).call{ value: address(this).balance }("");
    require(release);
  }

  // Added isTransferable only
  function approve(address to, uint256 tokenId) public override isTransferable {
    address ownerOfToken = ownerOf(tokenId);
    require(to != ownerOfToken, "ERC721: approval to current owner");

    require(_msgSender() == ownerOfToken || isApprovedForAll(ownerOfToken, _msgSender()), "ERC721: approve caller is not owner nor approved for all");

    _approve(to, tokenId);
  }

  // Added isTransferable only
  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public override isTransferable whenNotPaused {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

    _transfer(from, to, tokenId);
  }

  // Added isTransferable only
  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
  ) public override isTransferable whenNotPaused {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
    _safeTransfer(from, to, tokenId, _data);
  }

  //===== Internal Functions =====//

  function _mint(
    address to,
    string memory nickName,
    string memory role
  ) internal whenNotPaused {
    uint256 tokenId = _counter.current();
    _tokenOwnerInfo[tokenId].nickName = nickName;
    _tokenOwnerInfo[tokenId].role = role;
    _mintedTo[tokenId] = to;
    _safeMint(to, tokenId);
    _counter.increment();
  }

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721Upgradeable, ERC721VotesUpgradeable) {
    _transferVotingUnits(from, to, 1);
    super._afterTokenTransfer(from, to, tokenId);
  }

  function _authorizeUpgrade(
    address /*newImplementation*/
  ) internal virtual override {
    require(hasRole(UPGRADER_ROLE, msg.sender), "Unauthorized Upgrade");
  }

  function constructTokenURI(TokenURIParams memory params) internal view returns (string memory) {
    string memory svg = Base64.encode(
      bytes(
        abi.encodePacked(
          "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 1200 1600' width='1200' height='1600' style='background-color:white'>",
          svgLogo,
          "<text style='font: bold 100px sans-serif;' text-anchor='middle' alignment-baseline='central' x='600' y='1250'>",
          params.nickName,
          "</text>",
          "<text style='font: bold 100px sans-serif;' text-anchor='middle' alignment-baseline='central' x='600' y='1350'>",
          params.role,
          "</text>",
          "<text style='font: bold 100px sans-serif;' text-anchor='middle' alignment-baseline='central' x='600' y='1450'>",
          _organization,
          "</text>",
          "</svg>"
        )
      )
    );

    // prettier-ignore
    /* solhint-disable */
    string memory json = string(abi.encodePacked(
          '{ "id": ',
          Strings.toString(params.id),
          ', "nickName": "',
          params.nickName,
          '", "role": "',
          params.role,
          '", "organization": "',
          params.organization,
          '", "tokenName": "',
          params.tokenName,
          '", "image": "data:image/svg+xml;base64,',
          svg,
          '" }'
        ));

    // prettier-ignore
    return string(abi.encodePacked('data:application/json;utf8,', json));
    /* solhint-enable */
  }

  //===== Modifiers =====//

  modifier isTransferable() {
    require(transferable() == true, "SoulBoundNFT: not transferable");
    _;
  }

  modifier exists(uint256 tokenId) {
    require(_exists(tokenId), "token doesn't exist or has been burnt");
    _;
  }

  modifier onlyMinterOrTokenOwner(uint256 tokenId) {
    require(_exists(tokenId), "token doesn't exist or has been burnt");
    require(_msgSender() == ownerOf(tokenId) || hasRole(MINTER_ROLE, msg.sender), "sender not owner or token owner");
    _;
  }

  // The following functions are overrides required by Solidity.

  function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, AccessControlUpgradeable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
