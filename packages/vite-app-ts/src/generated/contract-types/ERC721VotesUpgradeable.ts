/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface ERC721VotesUpgradeableInterface extends utils.Interface {
  contractName: 'ERC721VotesUpgradeable';
  functions: {
    'DOMAIN_SEPARATOR()': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'delegate(address)': FunctionFragment;
    'delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'delegates(address)': FunctionFragment;
    'getApproved(uint256)': FunctionFragment;
    'getPastTotalSupply(uint256)': FunctionFragment;
    'getPastVotes(address,uint256)': FunctionFragment;
    'getVotes(address)': FunctionFragment;
    'isApprovedForAll(address,address)': FunctionFragment;
    'name()': FunctionFragment;
    'nonces(address)': FunctionFragment;
    'ownerOf(uint256)': FunctionFragment;
    'safeTransferFrom(address,address,uint256)': FunctionFragment;
    'setApprovalForAll(address,bool)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'symbol()': FunctionFragment;
    'tokenURI(uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'DOMAIN_SEPARATOR', values?: undefined): string;
  encodeFunctionData(functionFragment: 'approve', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string;
  encodeFunctionData(functionFragment: 'delegate', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'delegateBySig',
    values: [string, BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: 'delegates', values: [string]): string;
  encodeFunctionData(functionFragment: 'getApproved', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPastTotalSupply', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPastVotes', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getVotes', values: [string]): string;
  encodeFunctionData(functionFragment: 'isApprovedForAll', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nonces', values: [string]): string;
  encodeFunctionData(functionFragment: 'ownerOf', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'safeTransferFrom', values: [string, string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'setApprovalForAll', values: [string, boolean]): string;
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(functionFragment: 'tokenURI', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'transferFrom', values: [string, string, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'DOMAIN_SEPARATOR', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegateBySig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegates', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getApproved', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPastTotalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPastVotes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVotes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isApprovedForAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nonces', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'ownerOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'safeTransferFrom', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setApprovalForAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'tokenURI', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;

  events: {
    'Approval(address,address,uint256)': EventFragment;
    'ApprovalForAll(address,address,bool)': EventFragment;
    'DelegateChanged(address,address,address)': EventFragment;
    'DelegateVotesChanged(address,uint256,uint256)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ApprovalForAll'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegateChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegateVotesChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; approved: string; tokenId: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { owner: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type DelegateChangedEvent = TypedEvent<
  [string, string, string],
  { delegator: string; fromDelegate: string; toDelegate: string }
>;

export type DelegateChangedEventFilter = TypedEventFilter<DelegateChangedEvent>;

export type DelegateVotesChangedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { delegate: string; previousBalance: BigNumber; newBalance: BigNumber }
>;

export type DelegateVotesChangedEventFilter = TypedEventFilter<DelegateVotesChangedEvent>;

export type TransferEvent = TypedEvent<[string, string, BigNumber], { from: string; to: string; tokenId: BigNumber }>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface ERC721VotesUpgradeable extends BaseContract {
  contractName: 'ERC721VotesUpgradeable';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC721VotesUpgradeableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    delegate(
      delegatee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    delegates(account: string, overrides?: CallOverrides): Promise<[string]>;

    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    getPastTotalSupply(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getPastVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    getVotes(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  delegate(
    delegatee: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  delegateBySig(
    delegatee: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  delegates(account: string, overrides?: CallOverrides): Promise<string>;

  getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getPastTotalSupply(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getPastVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  'safeTransferFrom(address,address,uint256)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'safeTransferFrom(address,address,uint256,bytes)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    approve(to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    delegate(delegatee: string, overrides?: CallOverrides): Promise<void>;

    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    delegates(account: string, overrides?: CallOverrides): Promise<string>;

    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getPastTotalSupply(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPastVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(operator: string, approved: boolean, overrides?: CallOverrides): Promise<void>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'Approval(address,address,uint256)'(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): ApprovalEventFilter;

    'ApprovalForAll(address,address,bool)'(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(owner?: string | null, operator?: string | null, approved?: null): ApprovalForAllEventFilter;

    'DelegateChanged(address,address,address)'(
      delegator?: string | null,
      fromDelegate?: string | null,
      toDelegate?: string | null
    ): DelegateChangedEventFilter;
    DelegateChanged(
      delegator?: string | null,
      fromDelegate?: string | null,
      toDelegate?: string | null
    ): DelegateChangedEventFilter;

    'DelegateVotesChanged(address,uint256,uint256)'(
      delegate?: string | null,
      previousBalance?: null,
      newBalance?: null
    ): DelegateVotesChangedEventFilter;
    DelegateVotesChanged(
      delegate?: string | null,
      previousBalance?: null,
      newBalance?: null
    ): DelegateVotesChangedEventFilter;

    'Transfer(address,address,uint256)'(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): TransferEventFilter;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    delegate(delegatee: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    delegates(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPastTotalSupply(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPastVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    delegate(
      delegatee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    delegates(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPastTotalSupply(blockNumber: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPastVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVotes(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}