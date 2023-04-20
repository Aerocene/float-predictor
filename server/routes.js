import { Picker } from 'meteor/meteorhacks:picker'; // meteor add meteorhacks:picker

// import trajectories from '../imports/api/flights/explorerTrajectories';

//--------------------------------
// routes
//--------------------------------
Picker.route('/signupconfirm/:id', function (params, request, response, next) {
    if (params.id) {
        if (confirmEmail(params.id)) {
            response.statusCode = 200;
            response.end("Thank you for signing up to the Newsletter.");
            return;
        }
    }

    response.statusCode = 200;
    response.end("Invalid");
});

//--------------------------------
// virtual flights
//--------------------------------
// Picker.route('/virtualflights', function (params, request, response, next) {

//     var fields = getFields(params);

//     var query = {};
//     if (params.query.created_after !== undefined) {
//         query = { created: { $gt: new Date(params.query.created_after) } };
//     }

//     if (params.query.version !== undefined) {
//         const v = parseInt(params.query.version);
//         // no field "version" before version 2
//         if (v > 1) { query.version = v; }
//         else { query.version = null; }
//     }

//     findFlightsResponse(query, fields, response);
// });

// Picker.route('/virtualflights/:id', function (params, request, response, next) {

//     var fields = getFields(params);

//     var id = params.id;
//     try {
//         id = new Mongo.ObjectID(id);
//     } catch (e) {
//         // nop
//     }

//     findFlightsResponse(id, fields, response);
// });


// Picker.route('/test', function (params, request, response, next) {

//     var fields = { "_id": 1 };

//     var id = "5cb9d54bc57685cf45beff2d";

//     try {
//         id = new Mongo.ObjectID(id);
//     } catch (e) {
//         // nop
//     }

//     const db_fligths = trajectories.find(id, {});
//     if (db_fligths) {
//         console.log(":: count: " + db_fligths.count());
//         var flights = db_fligths.fetch();
//         response.writeHead(200, { 'Content-Type': 'application/json' });
//         response.end(JSON.stringify(flights));
//     }
//     else {
//         response.statusCode = 500;
//         response.end("Error");
//     }
// });

// function getFields(params)
// {
//     var fields = { "_id": 1 };

//     if (params.query.fields !== undefined) {
//         if (Array.isArray(params.query.fields)) {
//             params.query.fields.forEach((e) => {
//                 fields[e] = 1;
//             });
//         } else if (typeof (params.query.fields) === "string") {
//             fields[params.query.fields] = 1;
//         }
//     }

//     return fields;
// }

// function findFlightsResponse(query, fields, response)
// {
//     const db_fligths = trajectories.find(query, { "fields": fields });
//     if (db_fligths) {

//         var flights = db_fligths.fetch();
//         flights.forEach((f) => {
//             if (f._id && f._id._str) {
//                 f._id = f._id._str;
//             }
//         });
//         response.writeHead(200, { 'Content-Type': 'application/json' });
//         response.end(JSON.stringify(flights));
//     }
//     else {
//         response.statusCode = 500;
//         response.end("Error");
//     }
// }
