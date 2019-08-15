import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser((options, user) => {

  if (user && user.emails && user.emails[0] && user.emails[0].address) {

    // check if we have emails in our settings
    if (Meteor.settings.emails !== undefined) {

      Email.send({ 
        to: user.emails[0].address, 
        from: Meteor.settings.emails.support, 
        subject: "Welcome to Floatpredictor", 
        text: "Your account for Floatpredictor was created successfully. Aerocene."
      });

    }
  }

  return user;
});