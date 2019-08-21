import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';
import { Exec } from 'meteor/jchristman:exec';


test = function(cmd, args, cb) {
  Exec.run(cmd, args, (result) => {
    if (result) {
      if (!result.startsWith("Child process exited with code:")) {
        cb(undefined, result);
      }
    }
  }, (error) => {
    if (error) {
      cb(error);
    }
  });
};

Meteor.methods({
  listDir() {

    var fut = new Future();  

    Exec.run("ls -l", (result) => {
      if (result) {
        if (fut) {
          fut.return(result);
          fut = undefined;
        }
      }
    }, (error) => {
      console.log("ERROR: "  + error);
      if (fut) {
        fut.throw(error);
        fut = undefined;
      }
    });

    return fut.wait();

    // const testSync = Meteor.wrapAsync(test);
    // return testSync("ls", ["-l"]);
  },
});

Meteor.startup(() => {
  // code to run on server at startup
  Future = Npm.require('fibers/future');

  Exec.allowClientCalls = true;
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