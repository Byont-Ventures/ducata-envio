/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  AllowlistChangedEntity,
  AuthorizerChangedEntity,
  ExcessTokenHandledEntity,
  ExitFeeChargedEntity,
  FeeChargedEntity,
  PausedStateChangedEntity,
  PoolBalanceChangedEntity,
  PoolBalanceManagedEntity,
  PoolIdGeneratedEntity,
  PoolRegisteredEntity,
  PoolTokenInfoEntity,
  SwapEntity,
  TokensRegisteredEntity,
  VaultEventsSummaryEntity,
} from "../generated/src/Types.gen";
import getAddressName from "./utils/getAddressName";
import {
  VaultContract_AllowlistChanged_handler,
  VaultContract_AllowlistChanged_loader,
  VaultContract_AuthorizerChanged_handler,
  VaultContract_AuthorizerChanged_loader,
  VaultContract_ExcessTokenHandled_handler,
  VaultContract_ExcessTokenHandled_loader,
  VaultContract_ExitFeeCharged_handler,
  VaultContract_ExitFeeCharged_loader,
  VaultContract_FeeCharged_handler,
  VaultContract_FeeCharged_loader,
  VaultContract_PausedStateChanged_handler,
  VaultContract_PausedStateChanged_loader,
  VaultContract_PoolBalanceChanged_handler,
  VaultContract_PoolBalanceChanged_loader,
  VaultContract_PoolBalanceManaged_handler,
  VaultContract_PoolBalanceManaged_loader,
  VaultContract_PoolIdGenerated_handler,
  VaultContract_PoolIdGenerated_loader,
  VaultContract_PoolRegistered_handler,
  VaultContract_PoolRegistered_loader,
  VaultContract_PoolTokenInfo_handler,
  VaultContract_PoolTokenInfo_loader,
  VaultContract_Swap_handler,
  VaultContract_Swap_loader,
  VaultContract_TokensRegistered_handler,
  VaultContract_TokensRegistered_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalVaultEventsSummary";

const INITIAL_EVENTS_SUMMARY: VaultEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  allowlistChangedsCount: BigInt(0),
  authorizerChangedsCount: BigInt(0),
  pausedStateChangedsCount: BigInt(0),
  poolBalanceChangedsCount: BigInt(0),
  poolBalanceManagedsCount: BigInt(0),
  poolIdGeneratedsCount: BigInt(0),
  poolRegisteredsCount: BigInt(0),
  exitFeeChargedsCount: BigInt(0),
  feeChargedsCount: BigInt(0),
  poolTokenInfosCount: BigInt(0),
  excessTokenHandledCount: BigInt(0),
  swapsCount: BigInt(0),
  tokensRegisteredsCount: BigInt(0),
};

VaultContract_AllowlistChanged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_AllowlistChanged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    allowlistChangedsCount:
      currentSummaryEntity.allowlistChangedsCount + BigInt(1),
  };

  let allowlistChangedEntity: AllowlistChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    newAllowlist: event.params.newAllowlist,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.AllowlistChanged.set(allowlistChangedEntity);
});

VaultContract_AuthorizerChanged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_AuthorizerChanged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    authorizerChangedsCount:
      currentSummaryEntity.authorizerChangedsCount + BigInt(1),
  };

  let authorizerChangedEntity: AuthorizerChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    newAuthorizer: event.params.newAuthorizer,

    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.AuthorizerChanged.set(authorizerChangedEntity);
});

VaultContract_PausedStateChanged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PausedStateChanged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    pausedStateChangedsCount:
      currentSummaryEntity.pausedStateChangedsCount + BigInt(1),
  };

  let pausedStateChangedEntity: PausedStateChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    paused: event.params.paused,

    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PausedStateChanged.set(pausedStateChangedEntity);
});

VaultContract_PoolBalanceChanged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PoolBalanceChanged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolBalanceChangedsCount:
      currentSummaryEntity.poolBalanceChangedsCount + BigInt(1),
  };

  let poolBalanceChangedEntity: PoolBalanceChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolName: getAddressName(event.params.poolId) ?? "Unknown",
    poolId: event.params.poolId,
    liquidityProvider: event.params.liquidityProvider,
    tokenA: getAddressName(event.params.tokens[0]) ?? event.params.tokens[0],
    tokenB: getAddressName(event.params.tokens[1]) ?? event.params.tokens[1],
    tokenADelta: event.params.deltas[0],
    tokenBDelta: event.params.deltas[1],
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PoolBalanceChanged.set(poolBalanceChangedEntity);
});

VaultContract_PoolBalanceManaged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PoolBalanceManaged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolBalanceManagedsCount:
      currentSummaryEntity.poolBalanceManagedsCount + BigInt(1),
  };

  let poolBalanceManagedEntity: PoolBalanceManagedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolName: getAddressName(event.params.poolId) ?? "Unknown",
    poolId: event.params.poolId,
    assetManager: event.params.assetManager,
    token: getAddressName(event.params.token) ?? event.params.token,
    cashDelta: event.params.cashDelta,
    managedDelta: event.params.managedDelta,
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PoolBalanceManaged.set(poolBalanceManagedEntity);
});

VaultContract_PoolIdGenerated_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PoolIdGenerated_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolIdGeneratedsCount:
      currentSummaryEntity.poolIdGeneratedsCount + BigInt(1),
  };

  let poolIdGeneratedEntity: PoolIdGeneratedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolId: getAddressName(event.params.poolId) ?? event.params.poolId,
    poolAddress: event.params.poolAddress,
    specialization: event.params.specialization,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PoolIdGenerated.set(poolIdGeneratedEntity);
});

VaultContract_PoolRegistered_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PoolRegistered_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolRegisteredsCount: currentSummaryEntity.poolRegisteredsCount + BigInt(1),
  };

  let poolRegisteredEntity: PoolRegisteredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolName: getAddressName(event.params.poolId) ?? "Unknown",
    poolId: event.params.poolId,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PoolRegistered.set(poolRegisteredEntity);
});

VaultContract_Swap_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_Swap_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    swapsCount: currentSummaryEntity.swapsCount + BigInt(1),
  };

  let swapEntity: SwapEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolName: getAddressName(event.params.poolId) ?? "Unknown",
    poolId: event.params.poolId,
    tokenIn: getAddressName(event.params.tokenIn) ?? event.params.tokenIn,
    tokenOut: getAddressName(event.params.tokenOut) ?? event.params.tokenOut,
    amountIn: event.params.amountIn,
    amountOut: event.params.amountOut,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.Swap.set(swapEntity);
});

VaultContract_TokensRegistered_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_TokensRegistered_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    tokensRegisteredsCount:
      currentSummaryEntity.tokensRegisteredsCount + BigInt(1),
  };

  let tokensRegisteredEntity: TokensRegisteredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolName: getAddressName(event.params.poolId) ?? "Unknown",
    poolId: event.params.poolId,
    tokenA: getAddressName(event.params.tokens[0]) ?? event.params.tokens[0],
    tokenB: getAddressName(event.params.tokens[1]) ?? event.params.tokens[1],
    assetManagers: event.params.assetManagers,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.TokensRegistered.set(tokensRegisteredEntity);
});

VaultContract_FeeCharged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_FeeCharged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    feeChargedsCount: currentSummaryEntity.feeChargedsCount + BigInt(1),
  };

  let feeChargedEntity: FeeChargedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    feeToken: getAddressName(event.params.feeToken) ?? event.params.feeToken,
    payer: getAddressName(event.params.payer) ?? event.params.payer,
    feeReceiver:
      getAddressName(event.params.feeReceiver) ?? event.params.feeReceiver,
    feeAmount: event.params.feeAmount,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.FeeCharged.set(feeChargedEntity);
});

VaultContract_ExitFeeCharged_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_ExitFeeCharged_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    exitFeeChargedsCount: currentSummaryEntity.exitFeeChargedsCount + BigInt(1),
  };

  let exitFeeChargedEntity: ExitFeeChargedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    payer: getAddressName(event.params.payer) ?? event.params.payer,
    feeAmount: event.params.feeAmount,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.ExitFeeCharged.set(exitFeeChargedEntity);
});

VaultContract_PoolTokenInfo_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_PoolTokenInfo_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolTokenInfosCount: currentSummaryEntity.poolTokenInfosCount + BigInt(1),
  };

  let poolTokenInfoEntity: PoolTokenInfoEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolAddress: event.params.poolAddress,
    tokenAAddress: event.params.tokens[0],
    tokenBAddress: event.params.tokens[1],
    tokenCAddress: event.params.tokens?.[2], // todo
    tokenA: getAddressName(event.params.tokens[0]) ?? event.params.tokens[0],
    tokenB: getAddressName(event.params.tokens[1]) ?? event.params.tokens[1],
    tokenC: getAddressName(event.params.tokens[2]) ?? event.params.tokens?.[2],
    balancesA: event.params.balances[0],
    balancesB: event.params.balances[1],
    balancesC: event.params.balances?.[2],
    lastChangeBlock: Number(event.params.lastChangeBlock),
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.PoolTokenInfo.set(poolTokenInfoEntity);
});

VaultContract_ExcessTokenHandled_loader(({ context }) => {
  context.VaultEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

VaultContract_ExcessTokenHandled_handler(({ event, context }) => {
  let summary = context.VaultEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: VaultEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    excessTokenHandledCount:
      currentSummaryEntity.excessTokenHandledCount + BigInt(1),
  };

  let excessTokenHandledEntity: ExcessTokenHandledEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenAddress:
      getAddressName(event.params.tokenAddress) ?? event.params.tokenAddress,
    excessBalance: event.params.excessBalance,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    vaultEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.VaultEventsSummary.set(nextSummaryEntity);
  context.ExcessTokenHandled.set(excessTokenHandledEntity);
});
