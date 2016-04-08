#!/bin/bash

echo "Mongo DB Backup started"

BACKUP_TARGET_ROOT="/var/cricmybrain/backup/mongo"
CURRENT_BACKUP_TARGET="$BACKUP_TARGET_ROOT/$(uuidgen)"

#Remove all but the latest 7 backups
cd $BACKUP_TARGET_ROOT
rm -rf 'ls -t | tail -n +7'

#Backup all the databases to a new directory
mongodump -o $CURRENT_BACKUP_TARGET --authenticationDatabase admin

zip -r "$(uuidgen).zip" $CURRENT_BACKUP_TARGET
rm -rf $CURRENT_BACKUP_TARGET

echo "Mongo DB Backup finished"
