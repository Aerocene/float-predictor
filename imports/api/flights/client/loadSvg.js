import { Meteor } from 'meteor/meteor';

export default function loadSvg(id) {
  
  return new Promise((resolve, reject) => {
    Meteor.call('loadSvg', id, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        resolve(result);
        return;
      }    
      reject();
    });
  });
}
