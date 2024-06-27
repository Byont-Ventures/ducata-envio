/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  AmoEventsSummaryEntity,
  AssetDeltasOnDmmSwapEntity,
  AssetManagerPutInFundsEntity,
  AssetManagerTookOutFundsEntity,
  TokensChangedInCoreEntity,
} from "../generated/src/Types.gen";
import getAddressName from "./utils/getAddressName";
import {
  AmoContract_AssetDeltasOnDmmSwap_handler,
  AmoContract_AssetDeltasOnDmmSwap_loader,
  AmoContract_AssetManagerPutInFunds_handler,
  AmoContract_AssetManagerPutInFunds_loader,
  AmoContract_AssetManagerTookOutFunds_handler,
  AmoContract_AssetManagerTookOutFunds_loader,
  AmoContract_TokensChangedInCore_handler,
  AmoContract_TokensChangedInCore_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalAmoEventsSummary";

const INITIAL_EVENTS_SUMMARY: AmoEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  assetDeltasOnDmmSwapsCount: BigInt(0),
  assetManagerPutInFundssCount: BigInt(0),
  assetManagerTookOutFundssCount: BigInt(0),
  tokensChangedInCoresCount: BigInt(0),
};

AmoContract_AssetDeltasOnDmmSwap_loader(({ context }) => {
  context.AmoEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

AmoContract_AssetDeltasOnDmmSwap_handler(({ event, context }) => {
  let summary = context.AmoEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: AmoEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    assetDeltasOnDmmSwapsCount:
      currentSummaryEntity.assetDeltasOnDmmSwapsCount + BigInt(1),
  };

  let assetDeltasOnDmmSwapEntity: AssetDeltasOnDmmSwapEntity = {
    id: event.transactionHash + event.logIndex?.toString(),
    tokenA: getAddressName(event.params.assets[0]) ?? event.params.assets[0],
    tokenB: getAddressName(event.params.assets[1]) ?? event.params.assets[1],
    tokenC:
      getAddressName(event.params.assets[2]) ?? event.params.assets[2] ?? "",
    amountA: event.params.assetDeltas[0] ?? 0,
    amountB: event.params.assetDeltas[1] ?? 0,
    amountC: event.params.assetDeltas[2] ?? 0,
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    amoEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.AmoEventsSummary.set(nextSummaryEntity);
  context.AssetDeltasOnDmmSwap.set(assetDeltasOnDmmSwapEntity);
});

AmoContract_AssetManagerPutInFunds_loader(({ context }) => {
  context.AmoEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

AmoContract_AssetManagerPutInFunds_handler(({ event, context }) => {
  let summary = context.AmoEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: AmoEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    assetManagerPutInFundssCount:
      currentSummaryEntity.assetManagerPutInFundssCount + BigInt(1),
  };

  let assetManagerPutInFundsEntity: AssetManagerPutInFundsEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolId: event.params.poolId,
    tokenAddress:
      getAddressName(event.params.tokenAddress) ?? event.params.tokenAddress,
    amount: event.params.amount,
    transactionHash: event.transactionHash,
    amoEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.AmoEventsSummary.set(nextSummaryEntity);
  context.AssetManagerPutInFunds.set(assetManagerPutInFundsEntity);
});

AmoContract_AssetManagerTookOutFunds_loader(({ context }) => {
  context.AmoEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

AmoContract_AssetManagerTookOutFunds_handler(({ event, context }) => {
  let summary = context.AmoEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: AmoEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    assetManagerTookOutFundssCount:
      currentSummaryEntity.assetManagerTookOutFundssCount + BigInt(1),
  };

  let assetManagerTookOutFundsEntity: AssetManagerTookOutFundsEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    poolId: event.params.poolId,
    tokenAddress:
      getAddressName(event.params.tokenAddress) ?? event.params.tokenAddress,
    amount: event.params.amount,
    transactionHash: event.transactionHash,
    amoEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.AmoEventsSummary.set(nextSummaryEntity);
  context.AssetManagerTookOutFunds.set(assetManagerTookOutFundsEntity);
});

AmoContract_TokensChangedInCore_loader(({ context }) => {
  context.AmoEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

AmoContract_TokensChangedInCore_handler(({ event, context }) => {
  let summary = context.AmoEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: AmoEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    tokensChangedInCoresCount:
      currentSummaryEntity.tokensChangedInCoresCount + BigInt(1),
  };

  let tokensChangedInCoreEntity: TokensChangedInCoreEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenIn: getAddressName(event.params.tokenIn) ?? event.params.tokenIn,
    tokenOut: getAddressName(event.params.tokenOut) ?? event.params.tokenOut,
    amount: event.params.amount,
    amountOut: event.params.amountOut,
    transactionHash: event.transactionHash,
    amoEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.AmoEventsSummary.set(nextSummaryEntity);
  context.TokensChangedInCore.set(tokensChangedInCoreEntity);
});
