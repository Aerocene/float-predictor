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
  traj4multi2d(day, pressure, destLat, destLong, urls) {

    // log gfs.time
    console.log("trajectory (" + day + ") on data from: " + runCommand("cat", [process.env.GFS_NPZ_DATA + "/gfs.time"]));    

    // var start = new Date().getTime();

    const result = runCommand("python", [process.env.TRAJ_4_MULTI_2D_SCRIPT, day, pressure, destLat, destLong, urls]);

    // var end = new Date().getTime();
    // console.log("traj4multi2d: " + (end - start) + " [ms]");
    
    return result;
  }
});




var gfs08;
var gfs20;

Meteor.startup(() => {
  
  Future = Npm.require('fibers/future');

  Exec.allowClientCalls = true;

  console.log("------------------------------------");
  console.log("starting up: " + Meteor.settings.public.mode);
  console.log(runCommand("date"));
  console.log("python: " + runCommand("which", ["python"]));
  console.log("python version: " + runCommand("python", ["--version"]));
  console.log("");

  console.log("------------------------------------");
  console.log(runCommand("find", ["/app/bundle/programs/web*", "-type", "d"]));
  console.log("------------------------------------");
  console.log(runCommand("ls", ["-l", "/app/bundle/programs/web.browser/app/data/gfs/"]));
  console.log(runCommand("ls", ["-l", "/app/bundle/programs/web.browser/app/data/gfs/data/"]));
  console.log(runCommand("ls", ["-l", "/app/bundle/programs/web.browser/app/data/gfs/data/10/"]));
  
  // make sure script is executable
  runCommand("chmod", ["a+x", Assets.absoluteFilePath("download_gfs.sh")]);

  if (Meteor.settings.public.mode !== undefined &&
    Meteor.settings.public.mode !== "local") {

      // initially remove lock file
      runCommand("rm", [process.env.GFS_SCRIPT_PATH + "/.lock"]);
    
      // install cron-jobs
      gfs08 = new Cron(function() {

        runCommand(Assets.absoluteFilePath("download_gfs.sh"), undefined, (msg) => {
          console.log("downloadGfsCron: " + msg);        
        }, (error) => {
          console.error("downloadGfsCron: " + error);        
        });
      
      }, {
        minute: 10,
        hour: 8
      });
      
      gfs20 = new Cron(function() {
        
        runCommand(Assets.absoluteFilePath("download_gfs.sh"), undefined, (msg) => {
          console.log("downloadGfsCron: " + msg);        
        }, (error) => {
          console.error("downloadGfsCron: " + error);        
        });
      
      }, {
        minute: 10,
        hour: 20
      });

      // run update
      runCommandAsnc(
        Assets.absoluteFilePath("download_gfs.sh"), 
        undefined, 
        (msg) => {
          console.log("downloadGfsAsync: " + msg);        
        }, 
        (error) => {
          console.error("downloadGfsAsync: " + error);        
        }
      );    

  } else {
    console.log("not starting downloadGfs");    
  }

  
  
  // console.log("GFS_NPZ_DATA: " + process.env.GFS_NPZ_DATA);
  // console.log("TRAJ_4_MULTI_2D_SCRIPT: " + process.env.TRAJ_4_MULTI_2D_SCRIPT);
  
  
  // serve files in GFS_NPZ_DATA
  //
  // const fs = Npm.require('fs');
  // 
  // Picker.route('/scripts/traj4multi2d.php', function (params, req, res, next) {
  //   //
  //   console.log("traj4mult: " + JSON.stringify(params));    
  //   res.end("none");
  // });

  // Picker.route('/scripts/:_file', function (params, req, res, next) {
  //   var data = fs.readFileSync(process.env.GFS_NPZ_DATA + "/" + params._file);    
  //   res.write(data);
  //   res.end();
  // });

  if (Meteor.settings.public.mode === "staging") {    
    Picker.route('/log/', function (params, req, res, next) {
      
      console.log("----- ps aux ----");  
      console.log("ps aux: " + runCommand("ps", ["-o", "pid,comm,nice"]));

      console.log("----- ls gfs data ----");
      doListDir("/app/bundle/programs/web.browser/app/data/gfs/data/10/");
      doListDir("/app/bundle/programs/web.browser.legacy/app/data/gfs/data/10/");

      res.end();
    });
  }

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