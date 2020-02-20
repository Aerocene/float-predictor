import trajectories from '../explorerTrajectories';

const PAGE_SIZE = 60;

Meteor.methods({
    loadFlights(page)
    {
        if (page === undefined || page <= 0) {
            console.error("requesting invalid page: " + page);
            return {};
        }

        // page: 1-based page number
        // TODO: don't use skip
        const db_fligths = trajectories.find({},
            {
            "sort": {created: -1}, 
            "skip": ((page-1)*PAGE_SIZE), 
            "limit": PAGE_SIZE,
            "fields": {"path": 0, "svg": 0}
        });

        // get total distance from mongodb
        const agg = trajectories.aggregate(
            {$group: {_id: null, count: {$sum: "$distance"}}}
        );

        let obj = {};

        if (db_fligths)
        {
            obj.flights = db_fligths.fetch();
            obj.count = db_fligths.count();
            
            if (agg[0]) {
                obj.total_distance = agg[0].count;
            }
        }

        return obj;
    },
});