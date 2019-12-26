import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ExplorerTrajectories from '../imports/api/flights/explorerTrajectories';

Meteor.startup(() => {
  Meteor.publish('flights', (skip, limit) => {
    check(skip, Number);
    check(limit, Number);
    return ExplorerTrajectories.find({}, { sort: { date: -1 }, skip, limit });
  });

  Meteor.publish('flights.mine', () => {
    const userId = Meteor.userId();
    if (!userId) {
      console.log("NO USER ID");      
      return [];
    }

    data = ExplorerTrajectories.find({ userId }, { sort: { date: -1 } });
    console.log("RETURN: " + (data));  
    return data;
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
