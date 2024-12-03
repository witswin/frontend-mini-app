import {
  avalanche,
  bsc,
  polygon,
  fantom,
  holesky,
  goerli,
  polygonMumbai,
  bscTestnet,
  gnosis,
  meter,
  zetachainAthensTestnet,
  scroll,
  xdc,
  arbitrum,
  telos,
  harmonyOne,
  celo,
  opBNBTestnet,
  linea,
  lineaTestnet,
  arbitrumNova,
  scrollSepolia,
  Chain,
  opBNB,
  optimism,
  mainnet,
  sepolia,
  base,
  mantle,
  thunderTestnet,
  baseGoerli,
  mantleTestnet,
  rootstock,
} from 'viem/chains';
import { quizType } from './globalTypes';

const IDChain = {
  id: 74,
  name: 'IDChain Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EIDI',
    symbol: 'EIDI',
  },
  network: 'IDChain',
  rpcUrls: {
    default: { http: ['https://idchain.one/rpc/'] },
    public: { http: ['https://idchain.one/rpc/'] },
  },
};

export const kccMainnet = {
  id: 321,
  name: 'KCC Mainnet',
  nativeCurrency: { name: 'KuCoin Token', symbol: 'KCS', decimals: 18 },
  rpcUrls: {
    bscscan: {
      http: ['https://rpc-mainnet.kcc.network'],
      webSocket: ['wss://rpc-mainnet.kcc.network'],
    },
    kccscan: {
      http: ['https://explorer.kcc.io/en/rpc'],
      webSocket: ['wss://explorer.kcc.io/en/rpc'],
    },
    default: {
      http: ['https://rpc-mainnet.kcc.network'],
    },
    public: {
      http: ['https://rpc-mainnet.kcc.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KCCScan',
      url: 'https://explorer.kcc.io/en',
    },
  },
  // contracts: {
  //   kccRegistrar: {
  //     address: "0x0000000000000000000000000000000000000000",
  //   },
  //   kccResolver: {
  //     address: "0x0000000000000000000000000000000000000000",
  //     blockCreated: 0, // Replace with the actual block number when deployed
  //   },
  //   multicall: {
  //     address: "0x0000000000000000000000000000000000000000",
  //     blockCreated: 0, // Replace with the actual block number when deployed
  //   },
  // },
} satisfies Chain;

export const supportedChains: Chain[] = [
  mainnet,
  sepolia,
  { ...avalanche, name: 'Avalanche C-Chain' },
  bsc,
  base,
  mantle,
  mantleTestnet,
  { ...thunderTestnet, name: '5ireChain Thunder' },
  { ...polygon, name: 'Polygon Mainnet' },
  { ...rootstock, name: 'Rootstock Mainnet' },
  {
    ...fantom,
    name: 'Fantom Opera',
    rpcUrls: {
      ...fantom.rpcUrls,
      default: { http: ['https://rpc.ftm.tools'] },
      public: { http: ['https://rpc.ftm.tools'] },
    },
  },
  {
    ...baseGoerli,
    name: 'Base Goerli Testnet',
  },
  holesky,
  goerli,
  polygonMumbai,
  {
    ...bscTestnet,
    rpcUrls: {
      ...bscTestnet.rpcUrls,
      default: { http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'] },
      public: { http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'] },
    },
  },
  gnosis,
  IDChain,
  {
    ...optimism,
    rpcUrls: {
      ...optimism.rpcUrls,
      default: { http: ['https://rpc.ankr.com/optimism'] },
      public: { http: ['https://optimism.llamarpc.com'] },
    },
  },
  meter,
  {
    ...zetachainAthensTestnet,
    name: 'ZetaChain Athens 3 Testnet',
    rpcUrls: {
      ...zetachainAthensTestnet.rpcUrls,
      default: { http: ['https://rpc.ankr.com/zetachain_evm_athens_testnet'] },
      public: { http: ['https://rpc.ankr.com/zetachain_evm_athens_testnet'] },
    },
    nativeCurrency: {
      ...zetachainAthensTestnet.nativeCurrency,
      symbol: 'ZETA',
    },
  },
  scroll,
  xdc,
  {
    ...arbitrum,
    rpcUrls: {
      ...arbitrum.rpcUrls,
      default: { http: ['https://rpc.ankr.com/arbitrum'] },
      public: { http: ['https://arbitrum.llamarpc.com'] },
    },
  },
  telos,
  { ...harmonyOne, name: 'Harmony Mainnet Shard 0' },
  celo,
  opBNBTestnet,
  linea,
  lineaTestnet,
  arbitrumNova,
  { ...scrollSepolia, name: 'Scroll Sepolia Testnet' },
  kccMainnet,
  opBNB,
  rootstock,
];

/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  GNOSIS = 100,
  BASE = 8453,
}

export const unitapPassSupportedNetworks = [
  {
    name: 'Bitcoin',
    icon: 'btc.svg',
    address: 'bc1qpcn3ztcgltws9ced8ktmn075dmqvj7dxu73fag',
    qr: 'btc-address.png',
  },
  {
    name: 'EVM Networks',
    icon: 'eth.svg',
    address: '0xdB1F064C0b188a95b7801050474Da26fc95eb01E',
    qr: 'ETH-address.png',
  },
  {
    name: 'Solana',
    icon: 'solana.svg',
    address: 'pRogDW5qSapudKBgeD2oTSaKku4jNgn3FE7RXo1ojrb',
    qr: 'solana-address.png',
  },
];

export const lightingChainId = '286621';

export const ACCESS_TOKEN_COOKIE_KEY = 'access_token';

// 10 min
export const LOBBY_THRESHOLD = 10 * 60 * 1000;

// 5 sec
export const REST_TIME = 5 * 1000;

// 13 sec
export const QUESTION_TIME = 13 * 1000;

// 3 sec
export const FREEZE_TIME = 3 * 1000;

export const topBarHeight = '120px';

export const mainBottomNavBar = '122px';

export const demoQuizData: quizType = {
  builtInHints: [
    {
      count: 1,
      hint: {
        description: 'Remove 2 wrong answers',
        hintType: 'fifty',
        icon: '',
        id: -1,
        isActive: true,
        title: '50/50',
      },
      id: -1,
    },
  ],
  chainId: 97, // Testnet
  createdAt: '2024-12-03T11:06:02.777Z',
  details: 'Demo Quiz to have a taste of what it feels',
  discordUrl: '',
  emailUrl: '',
  formattedPrize: 0.0,
  hintCount: 1,
  id: -1,
  image: '/assets/images/quiz/demo-quiz.png',
  isActive: true,
  isFinished: false,
  maxParticipants: 0,
  participantsCount: 0,
  prizeAmount: 0,
  questionHintTimeSeconds: 3,
  questions: [],
  questionTimeSeconds: 13,
  resources: [],
  restTimeSeconds: 7,
  shuffleAnswers: true,
  splitPrize: false,
  sponsors: [],
  startAt: new Date().toISOString(),
  telegramUrl: '',
  title: 'Demo Quiz',
  token: '',
  tokenAddress: '',
  tokenDecimals: 0,
  tokenImage: '/assets/images/quiz/demo-quiz.png',
  twitterUrl: '',
  txHash: null,
  userProfile: 0,
};
