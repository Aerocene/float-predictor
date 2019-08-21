import flights from '../flights';
import trajectories from '../explorerTrajectories';

Meteor.methods({
    loadFlights(page) {
        // page: 1-based page number
        // TODO: don't use skip
        // const db_fligths = flights.find({}, {"skip": ((page-1*10)), "limit": 10});
        const db_fligths = trajectories.find({}, {"skip": ((page-1*10)), "limit": 10});

        // get total distance from mongodb
        const agg = trajectories.aggregate(
            {$group: {_id: null, count: {$sum: "$distance"}}}
        );

        let obj = {};
        obj.flights = db_fligths.fetch();
        obj.count = db_fligths.count();
        obj.total_distance = agg[0].count;

        return obj;
    },
    loadSvg(id) { 
        const db_flights = flights.find({"_id": id});
        const arr = db_flights.fetch();
        if (arr.length > 0) {
            return arr[0].winningExplorerData.svg;            
        }
    },
});