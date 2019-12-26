import { Meteor } from 'meteor/meteor';

export default function loadFligthPath(id) {
  
  return new Promise((resolve, reject) => {
    
    Meteor.call('loadFlightPath', id, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      // expect an array with on element
      if (result.length === 0) {
        reject("no data in array");
      }
      if (result[0].path === undefined) {
        reject("no path in result");
      }

      // return result
      resolve(result[0].path);
    });
  });
}
