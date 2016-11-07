#!/usr/bin/env bash
echo "Installing Linker synchronization service monitor daemon"

LOCATION=`dirname $0`/scripts/linker-sync-monitord

echo "Copying scripts..."
cp $LOCATION '/etc/init.d'
echo "Scripts copied"

echo "Setting privileges"
chmod 755 '/etc/init.d/linker-sync-monitord'

echo "Adding service to system"
update-rc.d linker-sync-monitord defaults
echo "Service successfully added"

echo "Finished"
exit 0