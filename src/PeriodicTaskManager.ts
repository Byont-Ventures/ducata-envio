/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

import {
  PeriodicTaskManagerEventsSummaryEntity,
  RanContractionEntity,
  RanDcmStabilizerEntity,
  RanExecuteDucaStabilizerDownEntity,
  RanExecuteDucaStabilizerUpEntity,
  RanExecuteDusOptimizerEntity,
  RanExecuteDusStabilizerEntity,
  RanExecuteDusSupplyIncreaserEntity,
  RanExecuteLpdStabilizerEntity,
  RanMinimumPoolSizeRebaseEntity,
  RanPayOperatingFeeEntity,
  RanProvideDucaToSeDusEntity,
  RanReduceFundingRatioEntity,
  RanSendExcessReceivedFeeEntity,
  RanStabilityFeeEntity,
  RanStabilityFeeUpdateEntity,
  RanTopUpOperatingFundForProtocolFundingEntity,
  RanTreasuryFeeEntity,
  RanUpdateMarketValuesEntity,
  RanYieldEntity,
} from "../generated/src/Types.gen";
import {
  PeriodicTaskManagerContract_RanContraction_handler,
  PeriodicTaskManagerContract_RanContraction_loader,
  PeriodicTaskManagerContract_RanDcmStabilizer_handler,
  PeriodicTaskManagerContract_RanDcmStabilizer_loader,
  PeriodicTaskManagerContract_RanExecuteDucaStabilizerDown_handler,
  PeriodicTaskManagerContract_RanExecuteDucaStabilizerDown_loader,
  PeriodicTaskManagerContract_RanExecuteDucaStabilizerUp_handler,
  PeriodicTaskManagerContract_RanExecuteDucaStabilizerUp_loader,
  PeriodicTaskManagerContract_RanExecuteDusOptimizer_handler,
  PeriodicTaskManagerContract_RanExecuteDusOptimizer_loader,
  PeriodicTaskManagerContract_RanExecuteDusStabilizer_handler,
  PeriodicTaskManagerContract_RanExecuteDusStabilizer_loader,
  PeriodicTaskManagerContract_RanExecuteDusSupplyIncreaser_handler,
  PeriodicTaskManagerContract_RanExecuteDusSupplyIncreaser_loader,
  PeriodicTaskManagerContract_RanExecuteLpdStabilizer_handler,
  PeriodicTaskManagerContract_RanExecuteLpdStabilizer_loader,
  PeriodicTaskManagerContract_RanMinimuDcmLiquidity_loader,
  PeriodicTaskManagerContract_RanMinimumPoolSizeRebase_handler,
  PeriodicTaskManagerContract_RanMinimumPoolSizeRebase_loader,
  PeriodicTaskManagerContract_RanPayOperatingFee_handler,
  PeriodicTaskManagerContract_RanPayOperatingFee_loader,
  PeriodicTaskManagerContract_RanProvideDucaToSeDus_handler,
  PeriodicTaskManagerContract_RanProvideDucaToSeDus_loader,
  PeriodicTaskManagerContract_RanReduceFundingRatio_handler,
  PeriodicTaskManagerContract_RanReduceFundingRatio_loader,
  PeriodicTaskManagerContract_RanSendExcessReceivedFee_handler,
  PeriodicTaskManagerContract_RanSendExcessReceivedFee_loader,
  PeriodicTaskManagerContract_RanStabilityFeeUpdate_handler,
  PeriodicTaskManagerContract_RanStabilityFeeUpdate_loader,
  PeriodicTaskManagerContract_RanStabilityFee_handler,
  PeriodicTaskManagerContract_RanStabilityFee_loader,
  PeriodicTaskManagerContract_RanTopUpOperatingFundForProtocolFunding_handler,
  PeriodicTaskManagerContract_RanTopUpOperatingFundForProtocolFunding_loader,
  PeriodicTaskManagerContract_RanTreasuryFee_handler,
  PeriodicTaskManagerContract_RanTreasuryFee_loader,
  PeriodicTaskManagerContract_RanUpdateMarketValues_handler,
  PeriodicTaskManagerContract_RanUpdateMarketValues_loader,
  PeriodicTaskManagerContract_RanYield_handler,
  PeriodicTaskManagerContract_RanYield_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalPeriodicTaskManagerEventsSummary";

const INITIAL_EVENTS_SUMMARY: PeriodicTaskManagerEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,

  ranContractionsCount: BigInt(0),
  ranExecuteDucaStabilizerDownsCount: BigInt(0),
  ranExecuteDucaStabilizerUpsCount: BigInt(0),
  ranExecuteDusOptimizersCount: BigInt(0),
  ranExecuteDusStabilizersCount: BigInt(0),
  ranExecuteLpdStabilizersCount: BigInt(0),
  ranDcmStabilizersCount: BigInt(0),
  ranMinimumPoolSizeRebasesCount: BigInt(0),
  ranPayOperatingFeesCount: BigInt(0),
  ranProvideDucaToSeDussCount: BigInt(0),
  ranReduceFundingRatiosCount: BigInt(0),
  ranSendExcessReceivedFeesCount: BigInt(0),
  ranStabilityFeesCount: BigInt(0),
  ranStabilityFeeUpdatesCount: BigInt(0),
  ranTopUpOperatingFundForProtocolFundingsCount: BigInt(0),
  ranTreasuryFeesCount: BigInt(0),
  ranUpdateMarketValuessCount: BigInt(0),
  ranYieldsCount: BigInt(0),
  ranExecuteDusSupplyIncreasersCount: BigInt(0),
};

PeriodicTaskManagerContract_RanContraction_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanContraction_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ranContractionsCount: currentSummaryEntity.ranContractionsCount + BigInt(1),
  };

  let ranContractionEntity: RanContractionEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanContraction.set(ranContractionEntity);
});

PeriodicTaskManagerContract_RanExecuteDucaStabilizerDown_loader(
  ({ context }) => {
    context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

PeriodicTaskManagerContract_RanExecuteDucaStabilizerDown_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteDucaStabilizerDownsCount:
        currentSummaryEntity.ranExecuteDucaStabilizerDownsCount + BigInt(1),
    };

    let ranExecuteDucaStabilizerDownEntity: RanExecuteDucaStabilizerDownEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        blockTimestamp: event.blockTimestamp,
        transactionHash: event.transactionHash,
        periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteDucaStabilizerDown.set(
      ranExecuteDucaStabilizerDownEntity
    );
  }
);

PeriodicTaskManagerContract_RanExecuteDucaStabilizerUp_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanExecuteDucaStabilizerUp_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteDucaStabilizerUpsCount:
        currentSummaryEntity.ranExecuteDucaStabilizerUpsCount + BigInt(1),
    };

    let ranExecuteDucaStabilizerUpEntity: RanExecuteDucaStabilizerUpEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteDucaStabilizerUp.set(ranExecuteDucaStabilizerUpEntity);
  }
);

PeriodicTaskManagerContract_RanExecuteDusOptimizer_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanExecuteDusOptimizer_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteDusOptimizersCount:
        currentSummaryEntity.ranExecuteDusOptimizersCount + BigInt(1),
    };

    let ranExecuteDusOptimizerEntity: RanExecuteDusOptimizerEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteDusOptimizer.set(ranExecuteDusOptimizerEntity);
  }
);

PeriodicTaskManagerContract_RanExecuteDusStabilizer_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanExecuteDusStabilizer_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteDusStabilizersCount:
        currentSummaryEntity.ranExecuteDusStabilizersCount + BigInt(1),
    };

    let ranExecuteDusStabilizerEntity: RanExecuteDusStabilizerEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteDusStabilizer.set(ranExecuteDusStabilizerEntity);
  }
);

PeriodicTaskManagerContract_RanExecuteLpdStabilizer_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanExecuteLpdStabilizer_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteLpdStabilizersCount:
        currentSummaryEntity.ranExecuteLpdStabilizersCount + BigInt(1),
    };

    let ranExecuteLpdStabilizerEntity: RanExecuteLpdStabilizerEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteLpdStabilizer.set(ranExecuteLpdStabilizerEntity);
  }
);

PeriodicTaskManagerContract_RanDcmStabilizer_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanDcmStabilizer_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    RanDcmStabilizersCount:
      currentSummaryEntity.ranDcmStabilizersCount + BigInt(1),
  };

  let RanDcmStabilizerEntity: RanDcmStabilizerEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanDcmStabilizer.set(RanDcmStabilizerEntity);
});

PeriodicTaskManagerContract_RanMinimuDcmLiquidity_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanMinimumPoolSizeRebase_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanMinimumPoolSizeRebase_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranMinimumPoolSizeRebasesCount:
        currentSummaryEntity.ranMinimumPoolSizeRebasesCount + BigInt(1),
    };

    let ranMinimumPoolSizeRebaseEntity: RanMinimumPoolSizeRebaseEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanMinimumPoolSizeRebase.set(ranMinimumPoolSizeRebaseEntity);
  }
);

PeriodicTaskManagerContract_RanPayOperatingFee_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanPayOperatingFee_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ranPayOperatingFeesCount:
      currentSummaryEntity.ranPayOperatingFeesCount + BigInt(1),
  };

  let ranPayOperatingFeeEntity: RanPayOperatingFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanPayOperatingFee.set(ranPayOperatingFeeEntity);
});

PeriodicTaskManagerContract_RanProvideDucaToSeDus_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanProvideDucaToSeDus_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      RanProvideDucaToSeDussCount:
        currentSummaryEntity.ranProvideDucaToSeDussCount + BigInt(1),
    };

    let RanProvideDucaToSeDusEntity: RanProvideDucaToSeDusEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanProvideDucaToSeDus.set(RanProvideDucaToSeDusEntity);
  }
);

PeriodicTaskManagerContract_RanReduceFundingRatio_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanReduceFundingRatio_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranReduceFundingRatiosCount:
        currentSummaryEntity.ranReduceFundingRatiosCount + BigInt(1),
    };

    let ranReduceFundingRatioEntity: RanReduceFundingRatioEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanReduceFundingRatio.set(ranReduceFundingRatioEntity);
  }
);

PeriodicTaskManagerContract_RanSendExcessReceivedFee_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanSendExcessReceivedFee_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranSendExcessReceivedFeesCount:
        currentSummaryEntity.ranSendExcessReceivedFeesCount + BigInt(1),
    };

    let ranSendExcessReceivedFeeEntity: RanSendExcessReceivedFeeEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanSendExcessReceivedFee.set(ranSendExcessReceivedFeeEntity);
  }
);

PeriodicTaskManagerContract_RanStabilityFee_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanStabilityFee_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ranStabilityFeesCount:
      currentSummaryEntity.ranStabilityFeesCount + BigInt(1),
  };

  let ranStabilityFeeEntity: RanStabilityFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanStabilityFee.set(ranStabilityFeeEntity);
});

PeriodicTaskManagerContract_RanStabilityFeeUpdate_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanStabilityFeeUpdate_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranStabilityFeeUpdatesCount:
        currentSummaryEntity.ranStabilityFeeUpdatesCount + BigInt(1),
    };

    let ranStabilityFeeUpdateEntity: RanStabilityFeeUpdateEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanStabilityFeeUpdate.set(ranStabilityFeeUpdateEntity);
  }
);

PeriodicTaskManagerContract_RanTopUpOperatingFundForProtocolFunding_loader(
  ({ context }) => {
    context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

PeriodicTaskManagerContract_RanTopUpOperatingFundForProtocolFunding_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranTopUpOperatingFundForProtocolFundingsCount:
        currentSummaryEntity.ranTopUpOperatingFundForProtocolFundingsCount +
        BigInt(1),
    };

    let ranTopUpOperatingFundForProtocolFundingEntity: RanTopUpOperatingFundForProtocolFundingEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        blockTimestamp: event.blockTimestamp,
        transactionHash: event.transactionHash,
        periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanTopUpOperatingFundForProtocolFunding.set(
      ranTopUpOperatingFundForProtocolFundingEntity
    );
  }
);

PeriodicTaskManagerContract_RanTreasuryFee_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanTreasuryFee_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ranTreasuryFeesCount: currentSummaryEntity.ranTreasuryFeesCount + BigInt(1),
  };

  let ranTreasuryFeeEntity: RanTreasuryFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanTreasuryFee.set(ranTreasuryFeeEntity);
});

PeriodicTaskManagerContract_RanUpdateMarketValues_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanUpdateMarketValues_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      RanUpdateMarketValuessCount:
        currentSummaryEntity.ranUpdateMarketValuessCount + BigInt(1),
    };

    let RanUpdateMarketValuesEntity: RanUpdateMarketValuesEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      blockTimestamp: event.blockTimestamp,
      transactionHash: event.transactionHash,
      periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanUpdateMarketValues.set(RanUpdateMarketValuesEntity);
  }
);

PeriodicTaskManagerContract_RanYield_loader(({ context }) => {
  context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PeriodicTaskManagerContract_RanYield_handler(({ event, context }) => {
  let summary = context.PeriodicTaskManagerEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ranYieldsCount: currentSummaryEntity.ranYieldsCount + BigInt(1),
  };

  let ranYieldEntity: RanYieldEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
  context.RanYield.set(ranYieldEntity);
});

// RanExecuteDusSupplyIncreaser

PeriodicTaskManagerContract_RanExecuteDusSupplyIncreaser_loader(
  ({ context }) => {
    context.PeriodicTaskManagerEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

PeriodicTaskManagerContract_RanExecuteDusSupplyIncreaser_handler(
  ({ event, context }) => {
    let summary = context.PeriodicTaskManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: PeriodicTaskManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      ranExecuteDusSupplyIncreasersCount:
        currentSummaryEntity.ranExecuteDusSupplyIncreasersCount + BigInt(1),
    };

    let ranExecuteDusSupplyIncreaserEntity: RanExecuteDusSupplyIncreaserEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        blockTimestamp: event.blockTimestamp,
        transactionHash: event.transactionHash,
        periodicTaskManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.PeriodicTaskManagerEventsSummary.set(nextSummaryEntity);
    context.RanExecuteDusSupplyIncreaser.set(
      ranExecuteDusSupplyIncreaserEntity
    );
  }
);
