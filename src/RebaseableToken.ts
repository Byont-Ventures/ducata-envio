/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

import {
  LogRebaseEntity,
  RebaseableTokenEventsSummaryEntity,
  TransferEntity,
} from "../generated/src/Types.gen";
import getAddressName from "./utils/getAddressName";
import {
  RebaseableTokenContract_LogRebase_handler,
  RebaseableTokenContract_LogRebase_loader,
  RebaseableTokenContract_Transfer_handler,
  RebaseableTokenContract_Transfer_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalIElasticRebaseableTokenEventsSummary";

const INITIAL_EVENTS_SUMMARY: RebaseableTokenEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  logRebasesCount: BigInt(0),
  transfersCount: BigInt(0),
};

RebaseableTokenContract_LogRebase_loader(({ context }) => {
  context.RebaseableTokenEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RebaseableTokenContract_LogRebase_handler(({ event, context }) => {
  let summary = context.RebaseableTokenEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: RebaseableTokenEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logRebasesCount: currentSummaryEntity.logRebasesCount + BigInt(1),
  };

  let logRebaseEntity: LogRebaseEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    totalSupply: event.params.totalSupply,
    token: getAddressName(event.srcAddress) ?? event.srcAddress,
    blockTimestamp: event.blockTimestamp,
    rebaseableTokenEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.RebaseableTokenEventsSummary.set(nextSummaryEntity);
  context.LogRebase.set(logRebaseEntity);
});

RebaseableTokenContract_Transfer_loader(({ context }) => {
  context.RebaseableTokenEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RebaseableTokenContract_Transfer_handler(({ event, context }) => {
  let summary = context.RebaseableTokenEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: RebaseableTokenEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    transfersCount: currentSummaryEntity.transfersCount + BigInt(1),
  };

  let transferEntity: TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    from: getAddressName(event.params.from) ?? event.params.from,
    to: getAddressName(event.params.to) ?? event.params.to,
    value: event.params.value,
    token: getAddressName(event.srcAddress) ?? event.srcAddress,
    blockTimestamp: event.blockTimestamp,
    rebaseableTokenEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.RebaseableTokenEventsSummary.set(nextSummaryEntity);
  context.Transfer.set(transferEntity);
});
