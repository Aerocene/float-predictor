#!/bin/bash

# script should be started by cron-service after reboot
# make sure we have correct environment

if [ -z "${GFS_SCRIPT_PATH}" ]; then
  echo "exporting GFS_SCRIPT_PATH=/scripts/"
  export GFS_SCRIPT_PATH=/scripts/
fi

if [ -z "${GFS_NPZ_DATA}" ]; then
  echo "exporting GFS_NPZ_DATA=/gfsdata/"
  export GFS_NPZ_DATA=/gfsdata/
fi

if [ -z "${GFS_JSON_DATA}" ]; then
  echo "exporting GFS_JSON_DATA=/app/bundle/programs/web.browser/app/data/gfs/"
  export GFS_JSON_DATA=/app/bundle/programs/web.browser/app/data/gfs/
fi


# update scripts
cd $GFS_SCRIPT_PATH
git pull

hour=`date +%k`

# check hour to download correct data
if [ "${hour}" -gt 20 ]; then

  echo "starting getdata 12"
  echo ""
  nice -n 10 ${GFS_SCRIPT_PATH}data2/getdata 12

elif [ "${hour}" -lt 8 ]; then

  # if it is too early download data from yesterday
  today=`date -u +%Y%m%d`
  yesterday=`date --date="${today} - 1 days" +%Y%m%d`

  echo "starting getdata 12 for: ${yesterday}"
  echo ""
  nice -n 10 ${GFS_SCRIPT_PATH}data2/getdata 12 $yesterday

else

  echo "starting getdata 00"
  echo ""
  nice -n 10 ${GFS_SCRIPT_PATH}data2/getdata 00

fi
