import { Meteor } from 'meteor/meteor';

export default function insertFlight(flightSimulatorState) {
  const flight = {
    ...flightSimulatorState,
    date: new Date(),
  };
  return new Promise((resolve, reject) => {
    Meteor.call('insertFlight', flight, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
