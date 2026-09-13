# Sports Data Providers

## Abstraction
- BaseSportsProvider abstract
- ApiSportsProvider (football), BasketballApiProvider
- SportsProviderFactory getProvider(sport)
- Configurable via SPORTS_API_KEY, SPORTS_API_BASE_URL, SPORTS_API_PROVIDER

## Supported Data
- Leagues: dynamic sync, not hard-coded small list, supports 50+ football leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa, Conference, FA Cup, Championship, EFL Cup, Copa del Rey, Copa Italia, DFB-Pokal, Coupe de France, MLS, Saudi Pro League, Brasileirão, Liga Portugal, Eredivisie, Belgian Pro League, Süper Lig, Scottish Premiership, Greek Super League, Argentine Primera, Liga MX, CAF Champions, CAF Confederation, etc) + international & women's where provider supports
- Basketball: NBA, WNBA, NCAA Men/Women, EuroLeague, EuroCup, FIBA, ACB, Bundesliga, LNB Pro A, Lega Serie A, Greek League, Turkish BSL, ABA League, etc
- Teams, Players, Fixtures, Results, Standings, Statistics, Lineups, Injuries, Odds

## Markets
- Football: 1X2, Double Chance, Over/Under, BTTS, Draw No Bet, Asian Handicap, Correct Score, Half-Time, Team Goals, Corners, Cards
- Basketball: Moneyline, Point Spread, Over/Under, Team Totals, Quarter Markets, Half Markets, Player Props where reliable
- Only display markets actually supplied by providers - never invent odds

## Sync Jobs
- sportsSync every 30 mins: leagues, fixtures
- oddsSync every 15 mins: odds + movement tracking
- cPanel cron compatible

## Management
- Admin can enable/disable league, feature, priority, search, sync
- Duplicate mapping handling
- Prediction availability toggle
