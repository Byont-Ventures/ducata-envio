/*
</

 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

import {
  DcmSwappedEntity,
  DucaSwappedEntity,
  DucaToDusSwappedEntity,
  DusToDucaSwappedEntity,
  InitializedEntity,
  LiquidityProvidedEntity,
  LiquidityWithdrawnEntity,
  ValidatorSwapsConfigurationChangedEntity,
  ValidatorSwapsEventsSummaryEntity,
} from "../generated/src/Types.gen";
import getAddressName from "./utils/getAddressName";
import {
  ValidatorSwapsContract_DcmSwapped_handler,
  ValidatorSwapsContract_DcmSwapped_loader,
  ValidatorSwapsContract_DucaSwapped_handler,
  ValidatorSwapsContract_DucaSwapped_loader,
  ValidatorSwapsContract_DucaToDusSwapped_handler,
  ValidatorSwapsContract_DucaToDusSwapped_loader,
  ValidatorSwapsContract_DusToDucaSwapped_handler,
  ValidatorSwapsContract_DusToDucaSwapped_loader,
  ValidatorSwapsContract_Initialized_handler,
  ValidatorSwapsContract_Initialized_loader,
  ValidatorSwapsContract_LiquidityProvided_handler,
  ValidatorSwapsContract_LiquidityProvided_loader,
  ValidatorSwapsContract_LiquidityWithdrawn_handler,
  ValidatorSwapsContract_LiquidityWithdrawn_loader,
  ValidatorSwapsContract_ValidatorSwapsConfigurationChanged_handler,
  ValidatorSwapsContract_ValidatorSwapsConfigurationChanged_loader,
} from "../generated/src/Handlers.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalValidatorSwapsEventsSummary";

const INITIAL_EVENTS_SUMMARY: ValidatorSwapsEventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  dcmSwappedsCount: BigInt(0),
  ducaSwappedsCount: BigInt(0),
  ducaToDusSwappedsCount: BigInt(0),
  dusToDucaSwappedsCount: BigInt(0),
  initializedsCount: BigInt(0),
  liquidityProvidedsCount: BigInt(0),
  liquidityWithdrawnsCount: BigInt(0),
  validatorSwapsConfigurationChangedsCount: BigInt(0),
};

ValidatorSwapsContract_DcmSwapped_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_DcmSwapped_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    dcmSwappedsCount: currentSummaryEntity.dcmSwappedsCount + BigInt(1),
  };

  let dcmSwappedEntity: DcmSwappedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender: getAddressName(event.params.sender) ?? event.params.sender,
    receiver: getAddressName(event.params.receiver) ?? event.params.receiver,
    dcmIn: event.params.dcmIn,
    ducaOut: event.params.ducaOut,
    fee: event.params.fee,
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.DcmSwapped.set(dcmSwappedEntity);
});

ValidatorSwapsContract_DucaSwapped_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_DucaSwapped_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ducaSwappedsCount: currentSummaryEntity.ducaSwappedsCount + BigInt(1),
  };

  let ducaSwappedEntity: DucaSwappedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender:
      getAddressName(
        getAddressName(event.params.sender) ?? event.params.sender
      ) ??
      getAddressName(event.params.sender) ??
      event.params.sender,
    receiver:
      getAddressName(
        getAddressName(event.params.receiver) ?? event.params.receiver
      ) ??
      getAddressName(event.params.sender) ??
      event.params.sender,
    ducaIn: event.params.ducaIn,
    dcmOut: event.params.dcmOut,
    fee: event.params.fee,
    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.DucaSwapped.set(ducaSwappedEntity);
});

ValidatorSwapsContract_DucaToDusSwapped_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_DucaToDusSwapped_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ducaToDusSwappedsCount:
      currentSummaryEntity.ducaToDusSwappedsCount + BigInt(1),
  };

  let ducaToDusSwappedEntity: DucaToDusSwappedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender: getAddressName(event.params.sender) ?? event.params.sender,
    receiver: getAddressName(event.params.receiver) ?? event.params.receiver,
    ducaIn: event.params.ducaIn,
    dusOut: event.params.dusOut,

    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.DucaToDusSwapped.set(ducaToDusSwappedEntity);
});

ValidatorSwapsContract_DusToDucaSwapped_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_DusToDucaSwapped_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    dusToDucaSwappedsCount:
      currentSummaryEntity.dusToDucaSwappedsCount + BigInt(1),
  };

  let dusToDucaSwappedEntity: DusToDucaSwappedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender: getAddressName(event.params.sender) ?? event.params.sender,
    receiver: getAddressName(event.params.receiver) ?? event.params.receiver,
    dusIn: event.params.dusIn,
    ducaOut: event.params.ducaOut,

    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.DusToDucaSwapped.set(dusToDucaSwappedEntity);
});

ValidatorSwapsContract_Initialized_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_Initialized_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    initializedsCount: currentSummaryEntity.initializedsCount + BigInt(1),
  };

  let initializedEntity: InitializedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    version: event.params.version,

    blockTimestamp: event.blockTimestamp,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.Initialized.set(initializedEntity);
});

ValidatorSwapsContract_LiquidityProvided_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_LiquidityProvided_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    liquidityProvidedsCount:
      currentSummaryEntity.liquidityProvidedsCount + BigInt(1),
  };

  let liquidityProvidedEntity: LiquidityProvidedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender: getAddressName(event.params.sender) ?? event.params.sender,
    receiver: getAddressName(event.params.receiver) ?? event.params.receiver,
    dcmIn: event.params.dcmIn,
    lpdOut: event.params.lpdOut,

    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.LiquidityProvided.set(liquidityProvidedEntity);
});

ValidatorSwapsContract_LiquidityWithdrawn_loader(({ context }) => {
  context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

ValidatorSwapsContract_LiquidityWithdrawn_handler(({ event, context }) => {
  let summary = context.ValidatorSwapsEventsSummary.get(
    GLOBAL_EVENTS_SUMMARY_KEY
  );

  let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    liquidityWithdrawnsCount:
      currentSummaryEntity.liquidityWithdrawnsCount + BigInt(1),
  };

  let liquidityWithdrawnEntity: LiquidityWithdrawnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    node: event.params.node,
    sender: getAddressName(event.params.sender) ?? event.params.sender,
    receiver: getAddressName(event.params.receiver) ?? event.params.receiver,
    lpdIn: event.params.lpdIn,
    dcmOut: event.params.dcmOut,

    blockTimestamp: event.blockTimestamp,
    transactionHash: event.transactionHash,
    validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
  context.LiquidityWithdrawn.set(liquidityWithdrawnEntity);
});

ValidatorSwapsContract_ValidatorSwapsConfigurationChanged_loader(
  ({ context }) => {
    context.ValidatorSwapsEventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

ValidatorSwapsContract_ValidatorSwapsConfigurationChanged_handler(
  ({ event, context }) => {
    let summary = context.ValidatorSwapsEventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    let currentSummaryEntity: ValidatorSwapsEventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      validatorSwapsConfigurationChangedsCount:
        currentSummaryEntity.validatorSwapsConfigurationChangedsCount +
        BigInt(1),
    };

    let validatorSwapsConfigurationChangedEntity: ValidatorSwapsConfigurationChangedEntity =
      {
        id: event.transactionHash + event.logIndex.toString(),
        name: event.params.name,
        oldValue: event.params.oldValue,
        newValue: event.params.newValue,

        blockTimestamp: event.blockTimestamp,
        validatorSwapsEventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
      };

    context.ValidatorSwapsEventsSummary.set(nextSummaryEntity);
    context.ValidatorSwapsConfigurationChanged.set(
      validatorSwapsConfigurationChangedEntity
    );
  }
);
