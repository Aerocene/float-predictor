/**
 * TrajectoryDataDownloader.js - downloads trajectory data providing update/end/error callbacks
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import moment from 'moment';
import FloatProfile from './FloatProfile';

const MAX_ERRORS = 20;

const mir = new FloatProfile("mir", "up_down_profile", 3.6, 10000, 0.9, 0, 2*3600, 2.5);
const explorer = new FloatProfile("explorer", "up_down_profile", 1.5, 10000, 1.29, 3 * 3600, -1, 2.5);
const generic_float = new FloatProfile("generic", "float_profile", 3.6, 10000, 1.3, 0, -1, 2.5);

/* eslint-disable no-console */
class TrajectoryDataDownloader {

  downloadMulti(
    departure, 
    destination, 
    altitude,
    color,
    onUpdateCallback, 
    onEndCallback, 
    onErrorCallback)
  {
    this.errors = 0;
    this.active = true;
    this.onUpdateCallback = onUpdateCallback;
    this.onEndCallback = onEndCallback;
    this.onErrorCallback = onErrorCallback;

    const config = {
      date: new Date(),
      day: 0,
      departure: departure,
      destination: destination,
      altitude: altitude,
      color: color,
    };

    this.downloadMultiS(config);
  }

  retryWithError(error, config)
  {    
    console.error(`retry with errors (${this.errors}/${MAX_ERRORS}): ${error.toString()}`);
    
    if (this.errors > MAX_ERRORS)
    {
      const error_message = "Could not load trajectories from server.\n\nPlease try again."
      // call error
      if (this.onErrorCallback)
        this.onErrorCallback(error_message);
      else
        console.error(error_message);        
    }
    else
    {
      this.errors++;
      this.downloadMultiS(config);
    }
  }

  downloadMultiS(config)
  {
    if (this.active !== true) {
      console.log("cancelling trajectory download");
      return;
    }

    const start_datetime = `${moment(config.date).format(escape('YYYY-MM-DDTHH'))}%3A00%3A00%2B01%3A00`;

    let float = generic_float;
    if (config.color === "Black")
    {
      float = explorer;
    } 
    else if (config.color === "Silver")
    {
      float = mir;
    }

    if (!isNaN(config.altitude))
    {
      float.float_altitude = config.altitude;
    }

    const lat = config.departure.lat;
    const lng = config.departure.lng < 0 ? (360 + config.departure.lng) : config.departure.lng;
    const time_resolution = 4000; //1200
    const use_sunrise = 1;
    const launch_altitude = 0;

    const host = "https://predict.aerocene.org";
    // const host = "http://127.0.0.1:5000"
    let url = `${host}/api/v1/?profile=${float.profile}&time_resolution=${time_resolution}&use_sunrise=${use_sunrise}&offset_days=${config.day}&launch_latitude=${lat}&launch_longitude=${lng}&launch_altitude=${launch_altitude}&launch_datetime=${start_datetime}&ascent_rate=${float.ascent_rate}&float_altitude=${float.float_altitude}`;
    // console.log("url: " + url);

    if (float.profile === "up_down_profile")
    {
      url += `&descent_rate=${float.descent_rate}&descent_before_sunset=${float.descent_before_sunset}&descent_duration=${float.descent_duration}`;
    }

    fetch(url).then(
      response => response.json()
    ).then((jsonData) => {
      // console.log('***********************');
      // console.log(jsonData);

      if (jsonData === undefined) {
        this.retryWithError("no jsondata", config);
        return;
      }

      // check if this is an error object
      if (jsonData.error !== undefined)
      {
        this.retryWithError(jsonData.error, config);
        return;
      }

      if (this.onUpdateCallback) {        
        this.onUpdateCallback(jsonData, config.day);
      }

      // download next day
      if (config.day < 7)
      {
        config.day += 1;
        this.errors = 0;
        this.downloadMultiS(config);
      }
      else
      {
        console.log('Trajectory data download complete: ' + jsonData.metadata.complete_datetime);
        if (this.onEndCallback)
        {
          this.onEndCallback();
        }

        this.destroy();
      }

    }).catch((error) => {
      console.error(`Trajectory Downloader error (${config.day})`);
      this.retryWithError(error, config);
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
