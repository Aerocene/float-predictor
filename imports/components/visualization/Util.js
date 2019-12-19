/**
 * Util.js - useful set of static functions
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/


/* eslint-disable no-mixed-operators, no-console, no-param-reassign */
const THREE = require('three');

const EARTH_RADIUS_KM = 6371;
const EARTH_RADIUS = 6371000;

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

const IS_MOBILE = window.mobilecheck();

export default {

  isMobile() {
    return IS_MOBILE;
  },

  dayOfYear(date) {
    const j1 = new Date(date);
    j1.setMonth(0, 0);
    return Math.round((date - j1) / 8.64e7);
  },

  addHours(date, h) {
    date.setTime(date.getTime() + (h * 60 * 60 * 1000));
    return this;
  },

  getEarthPolarRotation(dt) {
    const d = this.dayOfYear(dt);
    // console.log(d);
    const interval = 183.0;
    const june22 = 173;
    const december22 = 356;
    const rotation = 0.41015; // earth/sun max angle -> 22.5

    if (d > june22) {
      if (d < december22) {
        return rotation * 2.0 * (1.0 - (d - june22) / interval) - rotation;
      }
      return rotation * 2.0 * (d - december22) / interval - rotation;
    }
    return rotation * 2.0 * (1.0 - (june22 - d) / interval) - rotation;
  },
  getEarthAzimuthRotation(d) {
    return Math.PI * 2.5 + this.getDayAlpha(d) * (2.0 * Math.PI);
  },

  getDayAlpha(d) {
    return (d.getUTCHours() * 60 + d.getUTCMinutes()) / (24.0 * 60.0);
  },

  latLon2XYZPosition(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  },
  XYZ2LatLon(coord) {
    const RAD2DEG = 180 / Math.PI;
    // var DEG2RAD = Math.PI / 180
    let lng = 90 - Math.atan2(coord.x, -coord.z) * RAD2DEG;
    const l = Math.sqrt(coord.x * coord.x + coord.z * coord.z);
    const lat = Math.atan2(coord.y, l) * RAD2DEG;
    lng = (360 + lng) % 360;
    return { lat, lng };
  },
  latlng2Rad(lat, lng) {
    return {
      lat: (1.0 - ((lat + 270) / 180.0) % 1) * Math.PI,
      lng: ((lng + 90) / 360.0) * 2 * Math.PI,
    };
  },
  /*
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var geolocation = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude)
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
      });
    }
  },
*/
  mapValue(v, minv, maxv) {
    return Math.max(Math.min(v, maxv), minv);
  },

  pad(n) {
    return (n < 10) ? (`0${n}`) : n;
  },

  getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2) {

    if ((latitude1 == latitude2) && (longitude1 == longitude2)) {
      return 0;
    }

    var p = 0.017453292519943295;    //This is  Math.PI / 180
    var a = 0.5 - Math.cos((latitude2 - latitude1) * p) / 2 +
      Math.cos(latitude1 * p) * Math.cos(latitude2 * p) *
      (1 - Math.cos((longitude2 - longitude1) * p)) / 2;
    var R = 6371; //  Earth distance in km so it will return the distance in km
    var dist = 2 * R * Math.asin(Math.sqrt(a));
    return dist;
  },
};
