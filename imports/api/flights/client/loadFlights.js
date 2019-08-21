import { Meteor } from 'meteor/meteor';

export default function loadFlights() {
  
  return new Promise((resolve, reject) => {
    Meteor.call('loadFlights', (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}
