/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

import {
  DusReserveEventsSummaryEntity,
  DusYieldEntity,
} from "../generated/src/Types.gen";
import {
  DusReserveContract_DusYield_handler,
  DusReserveContract_DusYield_loader,
} from "../generated/src/Handlers.gen";
const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalDusReserveEventsSummary";

const INITIAL_EVENTS_SUMMARY: DusReserveEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  dusYieldCount: BigInt(0),
};

DusReserveContract_DusYield_loader(({ context }) => {
  context.DusReserveEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

DusReserveContract_DusYield_handler(({ event, context }) => {
  let summary = context.DusReserveEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: DusReserveEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity: DusReserveEventsSummaryEntity = {
    ...currentSummaryEntity,
    dusYieldCount: currentSummaryEntity.dusYieldCount + BigInt(1),
  };

  let dusYieldEntity: DusYieldEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dusYield: event.params.amount,
    yieldPercentage: event.params.yieldPercentage,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    dusReserveEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.DusReserveEventsSummary.set(nextSummaryEntity);
  context.DusYield.set(dusYieldEntity);
});
