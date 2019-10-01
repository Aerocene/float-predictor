/**
 * TrajectoryDataDownloader.js - downloads trajectory data providing update/end/error callbacks
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import traj4multi2d from '../../api/flights/client/traj4multi2d';

/* eslint-disable no-console */
class TrajectoryDataDownloader {
  downloadMulti(departure, destination, pressure,
    onUpdateCallback, onEndCallback, onErrorCallback) {
    this.active = true;
    // console.log(`Pressure level: ${pressure}`);
    this.onUpdateCallback = onUpdateCallback;
    this.onEndCallback = onEndCallback;
    this.onErrorCallback = onErrorCallback;
    // https://floatpredictor.aerocene.org/scripts/traj4multi2d.php?0,250,52.5,13.4%2049.2,-123.1,49.2,-123.1,49.2,-123.1,49.2,-123.1,49.2,-123.1,49.2,-123.1,49.2,-123.1,49.2,-123.1,
    let url = '';
    for (let i = 0; i < 8; i += 1) {
      url += `${departure.lat},${departure.lng},`;
    }
    this.downloadMultiS(0, url, departure, destination, pressure);
  }

  downloadMultiS(day, urls, departure, destination, pressure) {

    traj4multi2d(day, pressure, destination.lat, destination.lng, urls)
      .then((data) => {

        const json = JSON.parse(data);

        if (this.active) {

          if (this.onUpdateCallback) {
            this.onUpdateCallback(json);
          }

          let url = '';
          
          for (let i = 0; i < 8; i += 1) {
            const index = (json.d.length - 8) + i;
            url += `${json.d[index][2]},${json.d[index][3]},`;
          }

          if (day < 15) {          
            this.downloadMultiS(day + 1, url, departure, destination, pressure);
          } else {
            console.log('Trajectory data download complete: ' + json.timestamp);
            if (this.onEndCallback) {
              this.onEndCallback();
            }
          }
        }
      }).catch((r) => {
        console.log(`Downloader error. ACTIVE: ${this.active}`);
        console.log(r.message);
        if (this.active) {
          if (this.onErrorCallback) {
            this.onErrorCallback();
          }
        }
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
