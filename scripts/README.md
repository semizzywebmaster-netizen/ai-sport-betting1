# Scripts

## Cron Jobs - cPanel Compatible

- sportsSync.js: sync sports data
- oddsSync.js: sync odds
- cleanup.js: clean expired OTPs etc

Run via:
```bash
node dist/jobs/sportsSync.js
```

cPanel cron:
```
*/30 * * * * /usr/local/bin/node /home/user/backend/dist/jobs/sportsSync.js
```

## No Redis/RabbitMQ required
