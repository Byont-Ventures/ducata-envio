/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  CalibratedParValueEntity,
  ContractionEntity,
  DcmBurnStabilityFeeEntity,
  DucaFromSeDusRemovedEntity,
  DucaToSeDusAddedEntity,
  IncreaseToMinimumPoolSizeEntity,
  OpenMarketContractionEntity,
  PaidOperatingFeeEntity,
  ParValueOverwriteStoppedEntity,
  ParValueOverwrittenEntity,
  RebaseToMinimumPoolSizeEntity,
  StabilityFeeEntity,
  StabilityFeeUpdatedEntity,
  TheMintEventsSummaryEntity,
  TreasuryFeeEntity,
  UpdatedDucaYieldApyPercentageEntity,
  YieldEventEntity
} from '../generated/src/Types.gen';
import {
  TheMintContract_CalibratedParValue_handler,
  TheMintContract_CalibratedParValue_loader,
  TheMintContract_Contraction_handler,
  TheMintContract_Contraction_loader,
  TheMintContract_DcmBurnStabilityFee_handler,
  TheMintContract_DcmBurnStabilityFee_loader,
  TheMintContract_DucaFromSeDusRemoved_handler,
  TheMintContract_DucaFromSeDusRemoved_loader,
  TheMintContract_DucaToSeDusAdded_handler,
  TheMintContract_DucaToSeDusAdded_loader,
  TheMintContract_IncreaseToMinimumPoolSize_handler,
  TheMintContract_IncreaseToMinimumPoolSize_loader,
  TheMintContract_OpenMarketContraction_handler,
  TheMintContract_OpenMarketContraction_loader,
  TheMintContract_PaidOperatingFee_handler,
  TheMintContract_PaidOperatingFee_loader,
  TheMintContract_ParValueOverwriteStopped_handler,
  TheMintContract_ParValueOverwriteStopped_loader,
  TheMintContract_ParValueOverwritten_handler,
  TheMintContract_ParValueOverwritten_loader,
  TheMintContract_RebaseToMinimumPoolSize_handler,
  TheMintContract_RebaseToMinimumPoolSize_loader,
  TheMintContract_StabilityFeeUpdated_handler,
  TheMintContract_StabilityFeeUpdated_loader,
  TheMintContract_StabilityFee_handler,
  TheMintContract_StabilityFee_loader,
  TheMintContract_TreasuryFee_handler,
  TheMintContract_TreasuryFee_loader,
  TheMintContract_UpdatedDucaYieldApyPercentage_handler,
  TheMintContract_UpdatedDucaYieldApyPercentage_loader,
  TheMintContract_YieldEvent_handler,
  TheMintContract_YieldEvent_loader
} from '../generated/src/Handlers.gen';

const GLOBAL_EVENTS_SUMMARY_KEY = 'GlobalTheMintEventsSummary';

const INITIAL_EVENTS_SUMMARY: TheMintEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  calibratedParValuesCount: BigInt(0),
  contractionsCount: BigInt(0),
  dcmBurnStabilityFeesCount: BigInt(0),
  increaseToMinimumPoolSizesCount: BigInt(0),
  paidOperatingFeesCount: BigInt(0),
  parValueOverwriteStoppedsCount: BigInt(0),
  parValueOverwrittensCount: BigInt(0),
  stabilityFeesCount: BigInt(0),
  treasuryFeesCount: BigInt(0),
  yieldEventsCount: BigInt(0),
  stabilityFeeUpdatedsCount: BigInt(0),
  updatedDucaYieldApyPercentagesCount: BigInt(0),
  ducaToSeDusAddedCount: BigInt(0),
  ducaFromSeDusRemovedCount: BigInt(0),
  openMarketContractionsCount: BigInt(0),
  rebaseToMinimumPoolSizesCount: BigInt(0)
};

TheMintContract_CalibratedParValue_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_CalibratedParValue_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    calibratedParValuesCount:
      currentSummaryEntity.calibratedParValuesCount + BigInt(1)
  };

  let calibratedParValueEntity: CalibratedParValueEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dcmReserveDelta: event.params.dcmReserveDelta,
    ducaTotalSupply: event.params.ducaTotalSupply,
    currentMA200: event.params.currentMA200,
    dcmBalanceReserve: event.params.dcmBalanceReserve,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.CalibratedParValue.set(calibratedParValueEntity);
});

TheMintContract_Contraction_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_Contraction_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    contractionsCount: currentSummaryEntity.contractionsCount + BigInt(1)
  };

  let contractionEntity: ContractionEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dcmAmount: event.params.dcmAmount,
    ducaAmount: event.params.ducaAmount,
    ducaStabilityPoolBalance: event.params.ducaStabilityPoolBalance,
    dcmParValue: event.params.dcmParValue,
    contractionPercentage: event.params.contractionPercentage,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.Contraction.set(contractionEntity);
});

TheMintContract_DcmBurnStabilityFee_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_DcmBurnStabilityFee_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    dcmBurnStabilityFeesCount:
      currentSummaryEntity.dcmBurnStabilityFeesCount + BigInt(1)
  };

  let dcmBurnStabilityFeeEntity: DcmBurnStabilityFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    halfDcmFee: event.params.halfDcmFee,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.DcmBurnStabilityFee.set(dcmBurnStabilityFeeEntity);
});

TheMintContract_IncreaseToMinimumPoolSize_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_IncreaseToMinimumPoolSize_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    increaseToMinimumPoolSizesCount:
      currentSummaryEntity.increaseToMinimumPoolSizesCount + BigInt(1)
  };

  let increaseToMinimumPoolSizeEntity: IncreaseToMinimumPoolSizeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    initialDcmLiquidity: event.params.initialDcmLiquidity,
    reserveSize: event.params.reserveSize,
    dcmAddedToStabilityPool: event.params.dcmAddedToStabilityPool,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.IncreaseToMinimumPoolSize.set(increaseToMinimumPoolSizeEntity);
});

TheMintContract_PaidOperatingFee_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_PaidOperatingFee_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    paidOperatingFeesCount:
      currentSummaryEntity.paidOperatingFeesCount + BigInt(1)
  };

  let paidOperatingFeeEntity: PaidOperatingFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    feeInUsd: event.params.feeInUsd,
    operatingFeePercentage: event.params.operatingFeePercentage,
    dcmOperatingFee: event.params.dcmOperatingFee,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.PaidOperatingFee.set(paidOperatingFeeEntity);
});

TheMintContract_ParValueOverwriteStopped_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_ParValueOverwriteStopped_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    parValueOverwriteStoppedsCount:
      currentSummaryEntity.parValueOverwriteStoppedsCount + BigInt(1)
  };

  let parValueOverwriteStoppedEntity: ParValueOverwriteStoppedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.ParValueOverwriteStopped.set(parValueOverwriteStoppedEntity);
});

TheMintContract_ParValueOverwritten_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_ParValueOverwritten_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    parValueOverwrittensCount:
      currentSummaryEntity.parValueOverwrittensCount + BigInt(1)
  };

  let parValueOverwrittenEntity: ParValueOverwrittenEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    parValue: event.params.parValue,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.ParValueOverwritten.set(parValueOverwrittenEntity);
});

TheMintContract_StabilityFee_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_StabilityFee_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stabilityFeesCount: currentSummaryEntity.stabilityFeesCount + BigInt(1)
  };

  let stabilityFeeEntity: StabilityFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    totalDcmSupply: event.params.totalDcmSupply,
    openMarketDcmSupply: event.params.openMarketDcmSupply,
    stabilityFeePercentage: event.params.stabilityFeePercentage,
    totalDcmFee: event.params.totalDcmFee,
    blockTimestamp: event.blockTimestamp,
    treasurySeigniorageFee: event.params.treasurySeigniorageFee,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.StabilityFee.set(stabilityFeeEntity);
});

TheMintContract_TreasuryFee_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_TreasuryFee_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    treasuryFeesCount: currentSummaryEntity.treasuryFeesCount + BigInt(1)
  };

  let treasuryFeeEntity: TreasuryFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dcmTreasuryFeeInDcm: event.params.dcmTreasuryFeeInDcm,
    dcmPaidFromStabilityPool: event.params.dcmPaidFromStabilityPool,
    effectiveTreasuryFeePercentage: event.params.effectiveTreasuryFeePercentage,
    treasuryFeeApy: event.params.treasuryFeeApy,
    treasuryFeeCapped: event.params.treasuryFeeCapped,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.TreasuryFee.set(treasuryFeeEntity);
});

TheMintContract_YieldEvent_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_YieldEvent_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    yieldEventsCount: currentSummaryEntity.yieldEventsCount + BigInt(1)
  };

  let yieldEventEntity: YieldEventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    totalDucaSupply: event.params.totalDucaSupply,
    openMarketDucaSupply: event.params.openMarketDucaSupply,
    ducaAmountDistributed: event.params.ducaAmountDistributed,
    dcmAmountTransferred: event.params.dcmAmountTransferred,
    yieldPercentageUsed: event.params.yieldPercentageUsed,
    dcmBalanceTreasury: event.params.dcmBalanceTreasury,
    dcmParValue: event.params.dcmParValue,
    transactionHash: event.transactionHash,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.YieldEvent.set(yieldEventEntity);
});

TheMintContract_UpdatedDucaYieldApyPercentage_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_UpdatedDucaYieldApyPercentage_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    updatedDucaYieldApyPercentagesCount:
      currentSummaryEntity.updatedDucaYieldApyPercentagesCount + BigInt(1)
  };

  let updatedDucaYieldApyPercentageEntity: UpdatedDucaYieldApyPercentageEntity =
    {
      id: event.transactionHash + event.logIndex.toString(),
      newApy: event.params.newApy,
      newYieldFeePeriods: event.params.newYieldFeePeriods,
      newYieldPeriods: event.params.newYieldPeriods,
      effectiveYieldPercentage: event.params.effectiveYieldPercentage,
      blockTimestamp: event.blockTimestamp,
      theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
    };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.UpdatedDucaYieldApyPercentage.set(
    updatedDucaYieldApyPercentageEntity
  );
});
TheMintContract_DucaFromSeDusRemoved_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_DucaFromSeDusRemoved_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);
  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ducaFromSeDusRemovedCount:
      currentSummaryEntity.ducaFromSeDusRemovedCount + BigInt(1)
  };

  let ducaFromSeDusRemovedEntity: DucaFromSeDusRemovedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    ducaAmountBurned: event.params.ducaAmountBurned,
    dcmAmountTransferred: event.params.dcmAmountTransferred,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.DucaFromSeDusRemoved.set(ducaFromSeDusRemovedEntity);
});

TheMintContract_DucaToSeDusAdded_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_DucaToSeDusAdded_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);
  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ducaToSeDusAddedCount:
      currentSummaryEntity.ducaToSeDusAddedCount + BigInt(1)
  };

  let ducaToSeDusAddedEntity: DucaToSeDusAddedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    ducaAmountSent: event.params.ducaAmountSent,
    dcmAmountUsed: event.params.dcmAmountUsed,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.DucaToSeDusAdded.set(ducaToSeDusAddedEntity);
});

TheMintContract_StabilityFeeUpdated_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_StabilityFeeUpdated_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);
  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stabilityFeeUpdatedCount:
      currentSummaryEntity.stabilityFeeUpdatedsCount + BigInt(1)
  };

  let stabilityFeeUpdatedEntity: StabilityFeeUpdatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    stabilityFeeDeltaPoolSize: event.params.stabilityFeeDeltaPoolSize,
    stabilityFeePercentage: event.params.stabilityFeePercentage,
    currentPoolRatio: event.params.currentPoolRatio,
    targetPoolRatio: event.params.targetPoolRatio,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.StabilityFeeUpdated.set(stabilityFeeUpdatedEntity);
});

TheMintContract_OpenMarketContraction_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_OpenMarketContraction_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    openMarketContractionsCount:
      currentSummaryEntity.openMarketContractionsCount + BigInt(1)
  };

  let openMarketContractionEntity: OpenMarketContractionEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    contractionAmount: event.params.contractionAmount,
    rebaseDelta: event.params.rebaseDelta,
    openMarketContractionPercentage:
      event.params.openMarketContractionPercentage,
    transactionHash: event.transactionHash,
    block: event.blockNumber,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.OpenMarketContraction.set(openMarketContractionEntity);
});

TheMintContract_RebaseToMinimumPoolSize_loader(({ context }) => {
  context.TheMintEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

TheMintContract_RebaseToMinimumPoolSize_handler(({ event, context }) => {
  let summary = context.TheMintEventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: TheMintEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    rebaseToMinimumPoolSizesCount:
      currentSummaryEntity.rebaseToMinimumPoolSizesCount + BigInt(1)
  };

  let rebaseToMinimumPoolSizeEntity: RebaseToMinimumPoolSizeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    dcmAddedToStabilityPool: event.params.dcmAddedToStabilityPool,
    transactionHash: event.transactionHash,
    block: event.blockNumber,
    blockTimestamp: event.blockTimestamp,
    theMintEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY
  };

  context.TheMintEventsSummary.set(nextSummaryEntity);
  context.RebaseToMinimumPoolSize.set(rebaseToMinimumPoolSizeEntity);
});
