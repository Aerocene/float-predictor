/**
 * TrajectoryDataDownloader.js - downloads trajectory data providing update/end/error callbacks
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import moment from 'moment';
import FloatProfile from './FloatProfile';

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
    console.error(`retry with errors (${this.errors}/${MAX_ERRORS}): ${JSON.stringify(error)}`);
    
    if (this.errors > MAX_ERRORS)
    {
      const error_message = "Could not load trajectories from server. Please try again."
      // call error
      if (this.onErrorCallback)
        this.onErrorCallback(error_message);
      else
        console.error(error_message);        
    }
    else
    {
      this.errors++;
      this.downloadMultiS(date, day, departure, destination, altitude);
    }
  }

  downloadMultiS(date, day, departure, destination, altitude)
  {
    const start_datetime = `${moment(date).format(escape('YYYY-MM-DDTHH'))}%3A00%3A00%2B01%3A00`;

    const mir = new FloatProfile("mir", "up_down_profile", 3.6, altitude, 1.3, 0, 2.5);
    const explorer = new FloatProfile("explorer", "up_down_profile", 1.5, altitude, 1.29, 3 * 3600, 2.5);
    const generic_float = new FloatProfile("generic", "float_profile", 3.6, altitude, 1.3, 0, 2.5);

    const float = generic_float;

    const lat = departure.lat;
    const lng = departure.lng < 0 ? 360+departure.lng : departure.lng;
    const time_resolution = 4000; //1200
    const use_sunrise = 0;
    const launch_altitude = 0;

    let url = `https://predict.aerocene.org/api/v1/?profile=${float.profile}&time_resolution=${time_resolution}&use_sunrise=${use_sunrise}&offset_days=${day}&launch_latitude=${lat}&launch_longitude=${lng}&launch_altitude=${launch_altitude}&launch_datetime=${start_datetime}&ascent_rate=${float.ascent_rate}&float_altitude=${float.float_altitude}`;
    // console.log("url: " + url);

    if (float.profile === "up_down_profile")
    {
      url += `&descent_rate=${float.descent_rate}&descent_before_sunset=${float.descent_before_sunset}`;
    }

    fetch(url).then(
      response => response.json()
    ).then((jsonData) => {
      // console.log('***********************');
      // console.log(jsonData);

      if (jsonData === undefined) {
        this.retryWithError("no jsondata", date, day, departure, destination, altitude);
        return;
      }

      // check if this is an error object
      if (jsonData.error !== undefined)
      {
        this.retryWithError(jsonData.error, date, day, departure, destination, altitude);
        return;
      }

      if (this.onUpdateCallback) {
        this.onUpdateCallback(jsonData, day);
      }

      // download next day
      if (day < 7)
      {    
        this.downloadMultiS(date, day + 1, departure, destination, altitude);      
      }
      else
      {
        console.log('Trajectory data download complete: ' + jsonData.metadata.complete_datetime);
        if (this.onEndCallback)
        {
          this.onEndCallback();
        }
      }

    }).catch((r) => {
      console.error(`Trajectory Downloader error (${day})`);
      this.retryWithError(r, date, day, departure, destination, altitude);
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
