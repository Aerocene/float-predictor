import { Meteor } from "meteor/meteor";

Meteor.methods({
  cancelAccount() {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Please sign in first.');
    }

    return Meteor.users.remove(this.userId);
  },
});
