import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import flights from '../flights';

import calculateAerochange from '../../flights/calculateAerochange';
import convertKilometersToNauticalMiles from '../convertKilometersToNauticalMiles';
import calculateCO2PerKilometers from '../calculateCO2PerKilometers';

Meteor.methods({
  insertFlight(flight) {
    check(flight, Object);

    const earnedAeros = calculateAerochange(flight);
    const savedCO2InKilograms = calculateCO2PerKilometers(flight.winningExplorerData.minDist);
    const totalNauticalMiles = convertKilometersToNauticalMiles(flight.winningExplorerData.totalDistance);
    const totalKilometers = flight.winningExplorerData.totalDistance;

    flights.insert({
      ...flight,
      userId: Meteor.userId(),
      date: new Date(),
      earnedAeros,
      savedCO2InKilograms,
      totalNauticalMiles,
      totalKilometers,
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
