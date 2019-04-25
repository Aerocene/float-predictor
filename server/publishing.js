import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import flights from '../imports/api/flights/flights';

Meteor.startup(() => {
  Meteor.publish('flights', (skip, limit) => {
    check(skip, Number);
    check(limit, Number);
    return flights.find({}, { sort: { date: -1 }, skip, limit });
  });

  Meteor.publish('flights.mine', () => {
    const userId = this.userId;
    if (!userId) {
      return [];
    }
    return flights.find({ userId }, { sort: { date: -1 } });
  });

  Meteor.publish('currentUser', function publish() {
    const userId = this.userId;

    if (userId) {
      return Meteor.users.find({ _id: userId }, {
        fields: {
          emails: 1,
          profile: 1,
          savedCO2InKilograms: 1,
          totalKilometers: 1,
          totalNauticalMiles: 1,
          earnedAeros: 1,
        },
      });
    }

    this.ready();
    return [];
  });
});
