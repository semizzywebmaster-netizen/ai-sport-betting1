export const APP_NAME = 'PUNTER PREDICTION';
export const APP_VERSION = '1.0.0';
export const API_VERSION = 'v1';
export const DEFAULT_CURRENCY = 'NGN';
export const DEFAULT_TIMEZONE = 'Africa/Lagos';
export const DEFAULT_COUNTRY = 'NG';
export const MIN_BETTING_AGE = 18;

export const SPORTS = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
} as const;

export const FOOTBALL_MARKETS = [
  '1X2',
  'Double Chance',
  'Over/Under',
  'BTTS',
  'Draw No Bet',
  'Asian Handicap',
  'Correct Score',
  'Half-Time',
  'Team Goals',
  'Corners',
  'Cards',
] as const;

export const BASKETBALL_MARKETS = [
  'Moneyline',
  'Point Spread',
  'Over/Under',
  'Team Totals',
  'Quarter Markets',
  'Half Markets',
  'Player Props',
] as const;

export const BET_STRATEGIES = ['conservative', 'balanced', 'aggressive', 'custom'] as const;
export const TARGET_ODDS = [2, 5, 10, 20, 50, 100] as const;

export const SUBSCRIPTION_INTERVALS = ['weekly', 'monthly', 'yearly'] as const;

export const OTP_EXPIRY_MINUTES = 10;
export const PASSWORD_RESET_EXPIRY_MINUTES = 30;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_MINUTES = 30;

export const CREDIT_COSTS = {
  PREDICTION_VIEW: 1,
  AI_ANALYSIS: 2,
  BET_BUILDER: 3,
  AI_ASSISTANT: 1,
};

export const XP_REWARDS = {
  DAILY_LOGIN: 10,
  PREDICTION_VIEW: 5,
  BET_SLIP_CREATE: 15,
  POST_CREATE: 10,
  COMMENT: 5,
  REFERRAL: 100,
  ACCURATE_PREDICTION: 50,
};

export const NIGERIAN_LEAGUES_PRIORITY = [
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'NPFL',
];
