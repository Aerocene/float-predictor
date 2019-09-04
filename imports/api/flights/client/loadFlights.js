import { Meteor } from 'meteor/meteor';

export default function loadFlights(page) {
  
  return new Promise((resolve, reject) => {
    Meteor.call('loadFlights', page, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}
