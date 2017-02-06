var vero = require('vero')(VeroAuth);
var fs = require('fs')
var csv = require('fast-csv')
var argv = require('yargs')
    .usage('Usage: $0 -w [num] -h [num]')
    .demandOption(['w','h'])
    .argv;
 
console.log("The area is:", argv.w * argv.h);
console.dir(argv);

var fileName = "./secret-config.json"
var config

try {
  config = require(fileName)
}
catch (err) {
  config = {}
  console.log("unable to read file '" + fileName + "': ", err)
  console.log("see secret-config-sample.json for an example")
}

var VeroAuthTokens = config;
var VeroAuth = VeroAuthTokens.sandbox;

console.log("session secret is: ", VeroAuth)

var csv = String(process.argv[2])
console.log(csv)
var stream = fs.createReadStream(csv);

function VeroUserEdit(user, data) {
  vero.users.edit(
    user,
    {
      lastUpdate: Date.now()
    },
    function(error, response)
  {

    console.log(response)
    // if (response.ok) {
    //   console.log('users.edit::Success>', response.body.message);
    // } else {
    //   console.log('users.edit::Fail>', response.text);
    // }
  });
}

function VeroUserTag(user, new_tags, old_tags){
  vero.users.tags(user, "new tag", ["old tag"], function(error, response){
    if (response.ok) {
      console.log('users.tags::Success>', response.body.message);
    } else {
      console.log('users.tags::Fail>', response.text);
    }
  });
}

function VeroUserUnsubscribe(user, fromRetry){
  vero.users.unsubscribe(user, function(error, response){
    if (response) {
      if (response.ok) {
        console.log(user + 'users.unsubscribe::Success>', response.body.message);
        if (fromRetry) {
          console.log('~~~~~~~~~~');
          console.log('FROM RETRY')
          console.log('~~~~~~~~~~');
        }
      }
    } else {
        console.log('----------------------------------------');
        console.log(user + 'users.unsubscribe::Fail>');
        console.log(response);
        console.log('- - - - - - - - - - - - - - - - - - - - ');
        console.log('Retrying...');
        console.log('----------------------------------------');
        VeroUserUnsubscribe(user, true);
    }
  });
}

function ProcessCSV(stream, method){
  csv
    .fromStream(stream, {headers : true})
    .on("data", function(data){
      emailAddress = data['email'];
      // tags = data['tags'];
      // console.log(emailAddress);
      // console.log(tags);
      // VeroUserTag(emailAddress, tags);
      // VeroUserUnsubscribe(emailAddress);

  })
    .on("end", function(){
       console.log("done");
  });
}

console.log('Running...');

// vero.heartbeat(function(error, response){
//   if (response.ok) {
//     console.log('Heartbeat::Success>', response.body.message);
//   } else {
//     console.log('Heartbeat::Fail>', response.text);
//   }
// });

// vero.users.track('test@test.com', 'test@test.com', function(error, response){
//   if (response.ok) {
//     console.log('users.track::Success>', response.body.message);
//   } else {
//     console.log('users.track::Fail>', response.text);
//   }
// });

// vero.users.edit('test@test.com', {lastUpdate: Date.now()}, function(error, response){
//   if (response.ok) {
//     console.log('users.edit::Success>', response.body.message);
//   } else {
//     console.log('users.edit::Fail>', response.text);
//   }
// });

// vero.users.reidentify('test@test.com', 'test@test.com', function(error, response){
//   if (response.ok) {
//     console.log('users.reidentify::Success>', response.body.message);
//   } else {
//     console.log('users.reidentify::Fail>', response.text);
//   }
// });

// vero.users.tags('test@test.com', "new tag", ["old tag"], function(error, response){
//   if (response.ok) {
//     console.log('users.tags::Success>', response.body.message);
//   } else {
//     console.log('users.tags::Fail>', response.text);
//   }
// });

// vero.users.unsubscribe('test@test.com', function(error, response){
//   if (response.ok) {
//     console.log('users.unsubscribe::Success>', response.body.message);
//   } else {
//     console.log('users.unsubscribe::Fail>', response.text);
//   }
// });

// vero.users.resubscribe('test@test.com', function(error, response){
//   if (response.ok) {
//     console.log('users.resubscribe::Success>', response.body.message);
//   } else {
//     console.log('users.resubscribe::Fail>', response.text);
//   }
// });

// vero.events.track('test@test.com', null, "Test_Event", function(error, response){
//   if (response.ok) {
//     console.log('events.track::Success>', response.body.message);
//   } else {
//     console.log('events.track::Fail>', response.text);
//   }
// });
