import { Meteor } from 'meteor/meteor';

export default function loadUserFlights(page) {
  
  return new Promise((resolve, reject) => {
    
    Meteor.call('loadUserFlights', page, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (result.flights === undefined) {
        reject("no flights in result");
        return;
      }      
      resolve(result.flights);
    });
  });
}
