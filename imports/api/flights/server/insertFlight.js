import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import trajectories from '../explorerTrajectories';

Meteor.methods({
  insertFlight(flight) {
    check(flight, Object);

    const earnedAeros = flight.earnedAeros;
    const savedCO2InKilograms = flight.savedCO2InKilograms;
    const totalNauticalMiles = flight.totalNauticalMiles;
    const totalKilometers = flight.totalKilometers;

    trajectories.insert({
      ...flight,
      userId: Meteor.userId(),
      created: new Date(),      
    });

    Meteor.users.update(Meteor.userId(), {
      $inc: {
        earnedAeros,
        savedCO2InKilograms,
        totalNauticalMiles,
        totalKilometers,
      },
    });
  },
});
