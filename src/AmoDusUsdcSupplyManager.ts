/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  AmoDusUsdcSupplyManagerEventsSummaryEntity,
  DusUsdcSupplyManagerExecutedDecreasingDusEntity,
  DusUsdcSupplyManagerExecutedIncreasingDusEntity,
} from "../generated/src/Types.gen";
import {
  AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedDecreasingDus_handler,
  AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedDecreasingDus_loader,
  AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedIncreasingDus_handler,
  AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedIncreasingDus_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalAmoDusUsdcSupplyManagerEventsSummary";

const INITIAL_EVENTS_SUMMARY: AmoDusUsdcSupplyManagerEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  dusUsdcSupplyManagerExecutedIncreasingDusCount: BigInt(0),
  dusUsdcSupplyManagerExecutedDecreasingDusCount: BigInt(0),
};

AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedIncreasingDus_loader(
  ({ context }) => {
    context.AmoDusUsdcSupplyManagerEventsSummary.load(
      GLOBAL_EVENTS_SUMMARY_KEY
    );
  }
);

AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedIncreasingDus_handler(
  ({ event, context }) => {
    let summary = context.AmoDusUsdcSupplyManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: AmoDusUsdcSupplyManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      assetDeltasOnDmmSwapsCount:
        currentSummaryEntity.dusUsdcSupplyManagerExecutedIncreasingDusCount +
        BigInt(1),
    };

    let dusUsdcSupplyManagerExecutedIncreasingDus: DusUsdcSupplyManagerExecutedIncreasingDusEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        ducaReceived: event.params.ducaReceived,
        dusIncreased: event.params.dusIncreased,
        usdcDecreased: event.params.usdcDecreased,
        dcmSent: event.params.dcmSent,
        blockTimestamp: event.blockTimestamp,
        transactionHash: event.transactionHash,
        amoDusUsdcSupplyManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.AmoDusUsdcSupplyManagerEventsSummary.set(nextSummaryEntity);
    context.DusUsdcSupplyManagerExecutedIncreasingDus.set(
      dusUsdcSupplyManagerExecutedIncreasingDus
    );
  }
);

AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedDecreasingDus_loader(
  ({ context }) => {
    context.AmoDusUsdcSupplyManagerEventsSummary.load(
      GLOBAL_EVENTS_SUMMARY_KEY
    );
  }
);

AmoDusUsdcSupplyManagerContract_DusUsdcSupplyManagerExecutedDecreasingDus_handler(
  ({ event, context }) => {
    let summary = context.AmoDusUsdcSupplyManagerEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: AmoDusUsdcSupplyManagerEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      assetDeltasOnDmmSwapsCount:
        currentSummaryEntity.dusUsdcSupplyManagerExecutedDecreasingDusCount +
        BigInt(1),
    };

    let dusUsdcSupplyManagerExecutedDecreasingDus: DusUsdcSupplyManagerExecutedDecreasingDusEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        dcmReceived: event.params.dcmReceived,
        usdcIncreased: event.params.usdcIncreased,
        dusDecreased: event.params.dusDecreased,
        ducaSent: event.params.ducaSent,
        blockTimestamp: event.blockTimestamp,
        transactionHash: event.transactionHash,
        amoDusUsdcSupplyManagerEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.AmoDusUsdcSupplyManagerEventsSummary.set(nextSummaryEntity);
    context.DusUsdcSupplyManagerExecutedDecreasingDus.set(
      dusUsdcSupplyManagerExecutedDecreasingDus
    );
  }
);
