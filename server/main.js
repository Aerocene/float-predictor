import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';
import { Exec } from 'meteor/jchristman:exec';
import { Picker } from 'meteor/meteorhacks:picker'; // meteor add meteorhacks:picker
import { Cron } from 'meteor/chfritz:easycron'; // meteor add chfritz:easycron


runCommandAsnc = function(cmd, args, msgFn, errFn) {

  Exec.run(cmd, args, (result) => {
    if (result) {

      if (result.startsWith("Child process exited with code: ")) {
        exit_code = parseInt(result.split(": ")[1]);
        if (msgFn) {
          msgFn(cmd + " - exitcode: " + exit_code);          
        } else {
          console.log(cmd + " - exitcode: " + exit_code);          
        }

      } else {      
        if (msgFn) {
          msgFn(result);
        } else {
          console.log(cmd + ": " + result);          
        }
      }  
    }
  }, (error) => {
    if (errFn) {
      errFn(error);
    } else {
      console.error(cmd + ": " + error);
    }
  });
}

runCommand = function(cmd, args, msgFn, errFn) {

  var fut = new Future();
  var cmd_result = "";
  var exit_code = 0;

  Exec.run(cmd, args, (result) => {
    if (result) {

      if (result.startsWith("Child process exited with code: ")) {

        exit_code = parseInt(result.split(": ")[1])
        
        if (fut) {
          fut.return(cmd_result);
          fut = undefined;
        }

      } else {      
        if (msgFn) {
          msgFn(result);
        } else {          
          cmd_result += result;
        }
      }  
    }
  }, (error) => {
    if (errFn) {
      errFn(error);
    } else {          
      cmd_result += error;
    }
  });

  fut.wait();
  
  if (exit_code != 0) {
    console.error(cmd_result);
    return;
  }

  return cmd_result;
}


doListDir = function(path) {

  if (path === undefined || path === null) {
    path = "";
  } else {
    path = " " + path.toString();
  }

  return runCommand("ls", ["-l", path]);
}


Meteor.methods({
  listDir() {
    return doListDir();
  },
});


Meteor.startup(() => {
  
  Future = Npm.require('fibers/future');

  Exec.allowClientCalls = true;

  console.log("------------------------------------");
  console.log("starting up: " + Meteor.settings.public.mode);
  console.log(runCommand("date"));
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