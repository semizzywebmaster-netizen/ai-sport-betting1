#!/bin/bash
# cPanel Cron Setup for Punter Prediction
# Place this file in your home directory and setup cron jobs in cPanel

# Sports sync every 30 minutes
# */30 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/sportsSync.js >> /home/username/logs/sports.log 2>&1

# Odds sync every 15 minutes
# */15 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/oddsSync.js >> /home/username/logs/odds.log 2>&1

# Cleanup daily at 2 AM
# 0 2 * * * /usr/local/bin/node /home/username/backend/dist/jobs/cleanup.js >> /home/username/logs/cleanup.log 2>&1

# Subscription expiry check daily at 3 AM
# 0 3 * * * /usr/local/bin/node /home/username/backend/dist/jobs/cleanup.js >> /home/username/logs/subscription.log 2>&1

echo "cPanel Cron Jobs for Punter Prediction"
echo "Add these to cPanel -> Cron Jobs:"
echo ""
echo "*/30 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/sportsSync.js"
echo "*/15 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/oddsSync.js"
echo "0 2 * * * /usr/local/bin/node /home/username/backend/dist/jobs/cleanup.js"
