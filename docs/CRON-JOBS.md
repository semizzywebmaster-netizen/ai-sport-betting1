# Cron Jobs - cPanel Compatible

## No Redis/RabbitMQ/Supervisor Required
All jobs are simple Node.js scripts that can be triggered by cPanel cron.

## Jobs

### sportsSync
- File: dist/jobs/sportsSync.js
- Purpose: Sync leagues, teams, fixtures, standings from sports provider
- Frequency: Every 30 minutes
- Cron: */30 * * * * /usr/local/bin/node /home/user/backend/dist/jobs/sportsSync.js
- Gracefully handles missing API keys (returns empty, logs warning)

### oddsSync
- File: dist/jobs/oddsSync.js
- Purpose: Sync odds for upcoming fixtures, track movement
- Frequency: Every 15 minutes
- Cron: */15 * * * * /usr/local/bin/node /home/user/backend/dist/jobs/oddsSync.js
- Never invents odds - only stores provider data

### cleanup
- File: dist/jobs/cleanup.js
- Purpose: Clean expired OTPs, password resets, deactivate expired sessions, old audit logs
- Frequency: Daily 2 AM
- Cron: 0 2 * * * /usr/local/bin/node /home/user/backend/dist/jobs/cleanup.js

### Additional Jobs (create similarly)
- prediction settlement: check finished fixtures, settle predictions WON/LOST
- subscription expiry: call subscriptionService.checkExpiredSubscriptions
- analytics aggregation: aggregate daily metrics
- referral checks: detect fraud patterns

## Implementation
Each job:
- Connects to Prisma
- Does work
- Disconnects
- Logs via winston
- Exits with 0

## cPanel Setup
1. cPanel -> Cron Jobs
2. Add New Cron Job
3. Choose frequency
4. Command: /usr/local/bin/node /home/username/app/dist/jobs/jobName.js >> /home/username/logs/job.log 2>&1
5. Create logs directory: mkdir ~/logs

## Alternative: Render/Railway
- Use their cron job feature or set interval in app
- For cPanel, cron is primary

## Logging
- Logs to console (captured by cPanel Node.js logs)
- Optional file logs in ~/logs/
