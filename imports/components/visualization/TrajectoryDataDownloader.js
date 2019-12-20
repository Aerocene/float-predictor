/**
 * TrajectoryDataDownloader.js - downloads trajectory data providing update/end/error callbacks
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import moment from 'moment';

const MAX_ERRORS = 10;

/* eslint-disable no-console */
class TrajectoryDataDownloader {

  downloadMulti(
    departure, 
    destination, 
    altitude,
    onUpdateCallback, 
    onEndCallback, 
    onErrorCallback)
  {
    this.errors = 0;
    this.active = true;
    this.onUpdateCallback = onUpdateCallback;
    this.onEndCallback = onEndCallback;
    this.onErrorCallback = onErrorCallback;

    this.downloadMultiS(new Date(), 0, departure, destination, altitude);
  }

  retryWithError(error, date, day, departure, destination, altitude)
  {
    console.error(`retry with errors (${this.errors}/${MAX_ERRORS}): ${error}`);
    
    if (this.errors > MAX_ERRORS)
    {
      // call error
      if (this.onErrorCallback)
        this.onErrorCallback("too many errors");
      else
        console.error("too many errors!");        
    }
    else
    {
      this.errors++;
      downloadMultiS(date, day, departure, destination, altitude);
    }
  }

  downloadMultiS(date, day, departure, destination, altitude)
  {
    const start_datetime = `${moment(date).format(escape('YYYY-MM-DDTHH'))}%3A00%3A00%2B01%3A00`;
    const lat = departure.lat;
    const lng = departure.lng < 0 ? 360+departure.lng : departure.lng;
    const time_resolution = 4000; //1200
    const ascent_rate = 5;
    const float_profile = "float_profile";
    const use_sunrise = 1;
    const launch_altitude = 0;

    const url = `https://predict.aerocene.org/api/v1/?profile=${float_profile}&time_resolution=${time_resolution}&use_sunrise=${use_sunrise}&offset_days=${day}&launch_latitude=${lat}&launch_longitude=${lng}&launch_altitude=${launch_altitude}&launch_datetime=${start_datetime}&ascent_rate=${ascent_rate}&float_altitude=${altitude}`;
    // console.log("url: " + url);

    fetch(url).then(
      response => response.json()
    ).then((jsonData) => {
      // console.log('***********************');
      // console.log(jsonData);

      if (jsonData === undefined) {
        retryWithError("no jsondata", day, departure, destination, altitude);
        return;
      }

      // check if this is an error object
      if (jsonData.error !== undefined)
      {
        retryWithError("did not get trajectory data for: " + day, day, departure, destination, altitude);
        return;
      }

      if (this.onUpdateCallback) {
        this.onUpdateCallback(jsonData, day);
      }

      // download next day
      if (day < 7) {          
        this.downloadMultiS(date, day + 1, departure, destination, altitude);
      } else {
        console.log('Trajectory data download complete: ' + jsonData.metadata.complete_datetime);
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      }

    }).catch((r) => {
      console.error(`Trajectory Downloader error (${day})`);
      retryWithError(r, day, departure, destination, altitude);
    });

  }
  destroy() {
    this.active = false;
    this.onErrorCallback = undefined;
    this.onEndCallback = undefined;
    this.onUpdateCallback = undefined;
  }
}

export default TrajectoryDataDownloader;
