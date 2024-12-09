/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
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
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface MetaCoinInterface extends utils.Interface {
  functions: {
    "INITIAL_SUPPLY()": FunctionFragment;
    "NAME()": FunctionFragment;
    "SYMBOL()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "INITIAL_SUPPLY"
      | "NAME"
      | "SYMBOL"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "name"
      | "symbol"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "decimals"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "INITIAL_SUPPLY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "NAME", values?: undefined): string;
  encodeFunctionData(functionFragment: "SYMBOL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "INITIAL_SUPPLY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "NAME", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SYMBOL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface MetaCoin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MetaCoinInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    INITIAL_SUPPLY(overrides?: CallOverrides): Promise<[BigNumber]>;

    NAME(overrides?: CallOverrides): Promise<[string]>;

    SYMBOL(overrides?: CallOverrides): Promise<[string]>;

    /**
     * See {IERC20-allowance}.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    /**
     * See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
     */
    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * See {IERC20-balanceOf}.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Returns the name of the token.
     */
    name(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Returns the symbol of the token, usually a shorter version of the name.
     */
    symbol(overrides?: CallOverrides): Promise<[string]>;

    /**
     * See {IERC20-totalSupply}.
     */
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.
     */
    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.
     */
    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
     */
    decimals(overrides?: CallOverrides): Promise<[number]>;
  };

  INITIAL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

  NAME(overrides?: CallOverrides): Promise<string>;

  SYMBOL(overrides?: CallOverrides): Promise<string>;

  /**
   * See {IERC20-allowance}.
   */
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
   */
  approve(
    spender: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * See {IERC20-balanceOf}.
   */
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Returns the name of the token.
   */
  name(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the symbol of the token, usually a shorter version of the name.
   */
  symbol(overrides?: CallOverrides): Promise<string>;

  /**
   * See {IERC20-totalSupply}.
   */
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.
   */
  transfer(
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.
   */
  transferFrom(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
   */
  decimals(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    INITIAL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

    NAME(overrides?: CallOverrides): Promise<string>;

    SYMBOL(overrides?: CallOverrides): Promise<string>;

    /**
     * See {IERC20-allowance}.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
     */
    approve(
      spender: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * See {IERC20-balanceOf}.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the name of the token.
     */
    name(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the symbol of the token, usually a shorter version of the name.
     */
    symbol(overrides?: CallOverrides): Promise<string>;

    /**
     * See {IERC20-totalSupply}.
     */
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.
     */
    transfer(
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.
     */
    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
     */
    decimals(overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    INITIAL_SUPPLY(overrides?: CallOverrides): Promise<BigNumber>;

    NAME(overrides?: CallOverrides): Promise<BigNumber>;

    SYMBOL(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * See {IERC20-allowance}.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
     */
    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * See {IERC20-balanceOf}.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the name of the token.
     */
    name(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the symbol of the token, usually a shorter version of the name.
     */
    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * See {IERC20-totalSupply}.
     */
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.
     */
    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.
     */
    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
     */
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    INITIAL_SUPPLY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SYMBOL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-allowance}.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.
     */
    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-balanceOf}.
     */
    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the name of the token.
     */
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the symbol of the token, usually a shorter version of the name.
     */
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-totalSupply}.
     */
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.
     */
    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.
     */
    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.
     */
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
