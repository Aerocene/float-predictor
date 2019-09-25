import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';
import { Exec } from 'meteor/jchristman:exec';



runCommand = function(cmd, args) {

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
        cmd_result += result;
      }  
    }
  }, (error) => {
    cmd_result += error;
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
  traj4multi2d(day, pressure, destLat, destLong, urls) {

    // log gfs.time
    console.log("trajectory on data from: " + runCommand("more", [process.env.GFS_NPZ_DATA+"/gfs.time"]));    

    const result = runCommand("python", [process.env.TRAJ_4_MULTI_2D_SCRIPT, day, pressure, destLat, destLong, urls]);
    return result;
  }
});

Meteor.startup(() => {
  // code to run on server at startup
  Future = Npm.require('fibers/future');

  Exec.allowClientCalls = false;
  
  // console.log("GFS_NPZ_DATA: " + process.env.GFS_NPZ_DATA);
  // console.log("TRAJ_4_MULTI_2D_SCRIPT: " + process.env.TRAJ_4_MULTI_2D_SCRIPT);

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