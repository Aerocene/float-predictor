import { Meteor } from 'meteor/meteor';

export default function traj4multi2d(day, pressure, lat, lng, urls) {
  
  return new Promise((resolve, reject) => {
    Meteor.call('traj4multi2d', day, pressure, lat, lng, urls, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}
