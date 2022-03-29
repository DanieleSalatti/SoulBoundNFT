# SoulBound NFTs - The Membership Protocol

The idea behind SoulBound NFTs is to have non-transferable, burnable, mintable, ERC721Votes NFTs. The graphic is based on SVGs.

When a new membership token is created, the owner can set the SVG content of the membership. This graphic will be shared by all NFTs in the collection.

They can work in 2 ways:

1. A DAO or guild leader can mint NFTs to the addresses of users that earned the membership through e.g. work. 
A nickname and role can be specified, and will be displayed at the bottom of the NFTs.
2. A DAO or guild can decide to make the NFTs mintable as well, and set a mint price. The ETH goes into the contract and the DAO owner can withdraw at any time to a preset vault address (configurable). This is essentially a paid membership. A nickname can be specified, but the role is preset by the DAO.

There are 3 contracts in use here. 

1. The SoulBoundNFT itself, which represent the ERC721 token.
2. A proxy factory, used to create an upgradeable beacon on deployment and to create new proxies owned by the DAOs or guilds
3. A proxy registry, used to keep track of all the proxies, the addresses owning them and some other metadata. This is useful in case the proxy factory ever needs to be replaced.

Since I cannot foresee all the possible use cases, transferability in this implementation can be toggled by the contract owner.

It is currently live on Rinkeby and can be tested at (the UI is still pretty crude): https://soulbound.app/

Example membership collection on OpenSea can be found [here](https://testnets.opensea.io/collection/ethereum-dao-membership).

Built with [🏗 Scaffold-Eth Typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)

## Currently deployed on Rinkeby

SoulBoundNFT at [0xddbf050ea6E0d2e152E480158ba809f49ac2337b](https://rinkeby.etherscan.io/address/0xddbf050ea6E0d2e152E480158ba809f49ac2337b)

SoulBoundNFTProxyRegistry at [0xe9f1F0fA12E3055aB879065eEf825ea8E7A58f48](https://rinkeby.etherscan.io/address/0xe9f1F0fA12E3055aB879065eEf825ea8E7A58f48)

SoulBoundNFTFactory at [0x4B9652Bdd7f7a1AcB66299cEbFD2AE18C8934330](https://rinkeby.etherscan.io/address/0x4B9652Bdd7f7a1AcB66299cEbFD2AE18C8934330)

```
UpgradeableBeaconCreated [
Indexed { _isIndexed: true, hash: null },
'0xba7Ca1d46C5c74f8056dC70F831Cb5A41Bc9A2a7',
'0xddbf050ea6E0d2e152E480158ba809f49ac2337b',
createdBy: Indexed { _isIndexed: true, hash: null },
beacon: '0xba7Ca1d46C5c74f8056dC70F831Cb5A41Bc9A2a7',
initialImplementation: '0xddbf050ea6E0d2e152E480158ba809f49ac2337b'
]
```

upgradeableBeacon deployed to 0xba7Ca1d46C5c74f8056dC70F831Cb5A41Bc9A2a7
