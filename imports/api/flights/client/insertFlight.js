import { Meteor } from 'meteor/meteor';

export default function insertFlight(trajectory) {
  return new Promise((resolve, reject) => {
    Meteor.call('insertFlight', trajectory, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
