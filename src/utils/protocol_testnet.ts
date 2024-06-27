const contractAddresses = {
  DucataDmmAmoAddresses: {
    amo: {
      implementation: '0x83816E820313d643e04047F3C38B75443aAD1c11',
      proxy: '0x610FD7F971256F1F7804E2A29d8EA3FF3e3Ad686'
    },
    amoArbitrageCalculations: '0xab70d016f501dd1Fc2E9EBF616F968EfE1e20a47',
    amoDusUsdcSupplyManager: '0x432f5FA9e822Bf6295651Bd921f6E43492902929',
    amoStabilizerDusDuca: '0x8F6b6A8eFb680F11D30e6988ef4aDEBaeA43F87d',
    amoStabilizerLpd: '0x99160d5465c6E139CB4867384fcC17e7Cb6fc8b9',
    amoStabilizerParValue: '0x17def4579cF41285df92e4a528A44578C0562533',
    amoSwapWithCoreCalculations: '0x79E533933b29f0ebb7539aF617E9F5eccab13656',
    authorizer: '0x557055119b4C4D920D689d4aA1aE1A93bd869B04',
    dcmDucaPool: {
      address: '0xfe329cF8eA663E8CAF8935AC4C87446f8e45951d',
      poolId:
        '0xfe329cf8ea663e8caf8935ac4c87446f8e45951d000100000000000000000000'
    },
    dcmUsdcPool: {
      address: '0xF2db1e47a124C1F4818078Da23f3f7C7c48E4F07',
      poolId:
        '0xf2db1e47a124c1f4818078da23f3f7c7c48e4f07000100000000000000000003'
    },
    ducaDusPool: {
      address: '0x6FAfe474553e1EAC9c8F38dA90572e92D113ac94',
      poolId:
        '0x6fafe474553e1eac9c8f38da90572e92d113ac94000000000000000000000001'
    },
    dusUsdcPool: {
      address: '0x768687B8d92dAd80b332eD95e88Ab40f4647C3A9',
      poolId:
        '0x768687b8d92dad80b332ed95e88ab40f4647c3a9000000000000000000000004'
    },
    ethDucaPool: {
      address: '0x8e91Df111DDE38fE3B9B8Ee45022Ca64d0fC4c38',
      poolId:
        '0x8e91df111dde38fe3b9b8ee45022ca64d0fc4c38000100000000000000000005'
    },
    ethUsdOracle: '0xFa389e879aFB86ac73B971b62D13835761FAa3e9',
    externalWeightedMath: '0x64EFc1ba5b5C0fe1d5e9a1138074C04F1115E0E2',
    lpdDcmPool: {
      address: '0x793cA7fB2A278f6B594AC26fd9B32A03de186F6B',
      poolId:
        '0x793ca7fb2a278f6b594ac26fd9b32a03de186f6b000000000000000000000002'
    },
    oracleStorage: '0x8D1A63800Dbc90D52482fa28b75AceaB21DAd829',
    rateProviderLpdDcmForLpd: {
      implementation: '0x970C9eBaAAdc5FF2E7d052f5FCc1A5CD3F8497Dd',
      proxy: '0xB13063e6a94d7E41B3dF35cAE6A9e7e83DaEE75E'
    },
    usdc: '0x4e82FC422eA69062eFE8ea77683bDE7a02528783',
    usdcUsdOracle: '0x4Cd55a33DA1bC930a6bd5E9c26b753D03905192f',
    vault: '0x3AF78040a38C73Bc1AF2E1C4Ead531317326F8b8',
    weth: '0x97Dd11EA34EF15E1a16aa3282c6b5260AdE71Cc7'
  },
  DucataProtocolAddresses: {
    accessControl: {
      implementation: '0xD97e5020c893A7f47eC02f7735726A91FA701eF7',
      proxy: '0xA79f670E1DD705120cf3c623Af44CE6b782651B4'
    },
    communityFund: '0x13AbB6cD9d739Fda4bda2116C0F085c3128dF052',
    dcm: {
      implementation: '0xD091321bf38Ca4819085e1c1065b99C738d8fbeB',
      proxy: '0xb031154F6336F7F517A28209a9A21C70F9966704'
    },
    distribution: {
      implementation: '0x960E39B00b4F6A5596cdfe68425ec3d2eB7CD32c',
      proxy: '0xc892F79B89D820aC17bE765BdB6253fac528bFc5'
    },
    dmmFund: {
      implementation: '0x2C5805CaDD569A3a71cB6Bd1e8a15989EFe81AbA',
      proxy: '0x20dfaa6e871B658437a300291a320D54c0FEa253'
    },
    duca: {
      implementation: '0x35dDAFDDe1db1cb75F7a012B78b3C2d1b1A64d7F',
      proxy: '0x082e4cF436a20b26d20E78B21E794fc1a2C9464A'
    },
    dus: {
      implementation: '0x515e750E2B874248dfeA7230a0fBC4301edA3931',
      proxy: '0x5F7b3a6fB5F131f38B26Cfd0895272F0D50E2E2e'
    },
    dusReserve: {
      implementation: '0xb44816e3709e06a996d1b1E54bBF92673dd40Eb6',
      proxy: '0x0727f14C3866b5375d028241E7fBDE4dF1962D58'
    },
    operatingFund: {
      implementation: '0x65acb94e31EB811CCd44021c0AFd3e020f3744C2',
      proxy: '0xbB167961947FdA0B74ec42Acc817A7FB0Ac1534a'
    },
    periodicTaskManager: {
      implementation: '0x6c519131aE9e6d3E7b8F1ACb973786a0D45809aC',
      proxy: '0x99B553D7470C98192B6F635b117fb7C6fAe1B594'
    },
    policyData: {
      implementation: '0x6d124b8C9b51f206aADd8Bb19d650d42E400B317',
      proxy: '0x315E89614a6Aba229A9f8022728319c86Cc91409'
    },
    protocolConfigurator: {
      implementation: '0xDb1807ba786c406e57ef86B4Be0942bd792991B7',
      proxy: '0x82cE95143868D537D65e8518F87D45324Ce366Fc'
    },
    reserve: {
      implementation: '0xa6cfEaC4F3d99C745036939839B2A1cabA04390c',
      proxy: '0x4bdC6cf6b907b9EA0757EcAf1EF1646C371f7F5e'
    },
    seDus: {
      implementation: '0xB247E3D83341ac846d1CE7a0afDCBFFdAA014Ed4',
      proxy: '0xcB55365dF931AbD04dadeD66fD125f3e1916159e'
    },
    stabilityPool: {
      implementation: '0x5cbCBc9C8e7a7509b425137A74578e3ebbD4fef0',
      proxy: '0x2e58Ae209A32471aAA97FA4eE50Dd41A97D1D810'
    },
    theMint: {
      implementation: '0x4C26B810990302BE5358B2b77D0E4f2D3b1A01Fc',
      proxy: '0x37659a0a0b78258Ba3859F6D6424Fd247D39B79F'
    },
    validatorBase: {
      implementation: '0x217fB2e502a23932fdcc2D842AA9F6520033CE87',
      proxy: '0xa1D7f5A9B37E3c381cE2C65dB0383E9A275fAfDc'
    },
    validatorSwaps: {
      implementation: '0xE1c48A515dcf8dA6f18B72f0803b71bD0e2Ae149',
      proxy: '0xEAD52612edd91f9a9dE41154019bC34252aa5063'
    },
    xdrOracle: {
      implementation: '0xB440AeC56B46c52d2F92D8993bF4B4A08C2C760f',
      proxy: '0x4c74B371D9f54376ae94d1626bBDe2655D64cb30'
    }
  },
  DucataWalletAddresses: {
    deployer: '0x00743483b18951c8b72a5613c16e48D87CcCE620',
    maintainer: '0xd7Aaf756Af7A5a5233961905D8375BFc81e50Ddd',
    operatingFundWallet: '0x3ed646C0d29324ddAf882a18A92629B1FdDD697D',
    treasury: '0x09F33e3537BD270Eea38935b4F1b467AeE336Cf8'
  }
} as const;

export default contractAddresses;
