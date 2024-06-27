/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

import {
  MA200ResetEntity,
  NewDailyAverageValueEntity,
  NewDcmUsdcMvAllTimeHighEntity,
  PolicyDataEventsSummaryEntity,
  SwapDataWithExchangeDataEntity,
  UpdatedMa200Entity,
} from "../generated/src/Types.gen";
import getAddressName from "./utils/getAddressName";
import {
  PolicyDataContract_MA200Reset_handler,
  PolicyDataContract_MA200Reset_loader,
  PolicyDataContract_NewDailyAverageValue_handler,
  PolicyDataContract_NewDailyAverageValue_loader,
  PolicyDataContract_NewDcmUsdcMvAllTimeHigh_handler,
  PolicyDataContract_NewDcmUsdcMvAllTimeHigh_loader,
  PolicyDataContract_SwapDataWithExchangeData_handler,
  PolicyDataContract_SwapDataWithExchangeData_loader,
  PolicyDataContract_UpdatedMa200_handler,
  PolicyDataContract_UpdatedMa200_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalPolicyDataEventsSummary";

const INITIAL_EVENTS_SUMMARY: PolicyDataEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  mA200ResetsCount: BigInt(0),
  newDailyAverageValuesCount: BigInt(0),
  newDcmUsdcMvAllTimeHighCount: BigInt(0),
  swapDataWithExchangeDatasCount: BigInt(0),
  updatedMa200sCount: BigInt(0),
};

PolicyDataContract_MA200Reset_loader(({ context }) => {
  context.PolicyDataEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PolicyDataContract_MA200Reset_handler(({ event, context }) => {
  let summary = context.PolicyDataEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: PolicyDataEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    mA200ResetsCount: currentSummaryEntity.mA200ResetsCount + BigInt(1),
  };

  let mA200ResetEntity: MA200ResetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    parValue: event.params.parValue,
    maDay1: event.params.maDay1,
    dcmMarketValueAllTimeHigh: event.params.dcmMarketValueAllTimeHigh,
    dailyAverageProcessed: event.params.dailyAverageProcessed,
    blockTimestamp: event.blockTimestamp,
    policyDataEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PolicyDataEventsSummary.set(nextSummaryEntity);
  context.MA200Reset.set(mA200ResetEntity);
});

PolicyDataContract_NewDailyAverageValue_loader(({ context }) => {
  context.PolicyDataEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PolicyDataContract_NewDailyAverageValue_handler(({ event, context }) => {
  let summary = context.PolicyDataEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: PolicyDataEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    newDailyAverageValuesCount:
      currentSummaryEntity.newDailyAverageValuesCount + BigInt(1),
  };

  let newDailyAverageValueEntity: NewDailyAverageValueEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    value: event.params.value,
    average: event.params.average,
    blockTimestamp: event.blockTimestamp,
    policyDataEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PolicyDataEventsSummary.set(nextSummaryEntity);
  context.NewDailyAverageValue.set(newDailyAverageValueEntity);
});

PolicyDataContract_NewDcmUsdcMvAllTimeHigh_loader(({ context }) => {
  context.PolicyDataEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PolicyDataContract_NewDcmUsdcMvAllTimeHigh_handler(({ event, context }) => {
  let summary = context.PolicyDataEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: PolicyDataEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    newDcmMarketValueAllTimeHighCount:
      currentSummaryEntity.newDcmUsdcMvAllTimeHighCount + BigInt(1),
  };

  let newDcmUsdcMvAllTimeHighEntity: NewDcmUsdcMvAllTimeHighEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dcmUsdcMvAllTimeHigh: event.params.dcmUsdcMvAllTimeHigh,
    blockTimestamp: event.blockTimestamp,
    policyDataEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PolicyDataEventsSummary.set(nextSummaryEntity);
  context.NewDcmUsdcMvAllTimeHigh.set(newDcmUsdcMvAllTimeHighEntity);
});

PolicyDataContract_SwapDataWithExchangeData_loader(({ context }) => {
  context.PolicyDataEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PolicyDataContract_SwapDataWithExchangeData_handler(({ event, context }) => {
  let summary = context.PolicyDataEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: PolicyDataEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    swapDataWithExchangeDatasCount:
      currentSummaryEntity.swapDataWithExchangeDatasCount + BigInt(1),
  };

  let swapDataWithExchangeDataEntity: SwapDataWithExchangeDataEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    nonce: event.params.nonce,
    node: getAddressName(event.params.node) ?? event.params.node,
    dcmMarketValue: event.params.nodeData[0],
    ducaMarketValue: event.params.nodeData[1],
    ducaExchangeValue: event.params.nodeData[2],
    dusMarketValue: event.params.nodeData[3],
    blockTimestamp: event.blockTimestamp,
    policyDataEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PolicyDataEventsSummary.set(nextSummaryEntity);
  context.SwapDataWithExchangeData.set(swapDataWithExchangeDataEntity);
});

PolicyDataContract_UpdatedMa200_loader(({ context }) => {
  context.PolicyDataEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PolicyDataContract_UpdatedMa200_handler(({ event, context }) => {
  let summary = context.PolicyDataEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: PolicyDataEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    updatedMa200sCount: currentSummaryEntity.updatedMa200sCount + BigInt(1),
  };

  let updatedMa200Entity: UpdatedMa200Entity = {
    id: event.transactionHash + event.logIndex.toString(),
    value: event.params.value,
    ma200Average: event.params.ma200Average,
    blockTimestamp: event.blockTimestamp,
    policyDataEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PolicyDataEventsSummary.set(nextSummaryEntity);
  context.UpdatedMa200.set(updatedMa200Entity);
});
