import trajectories from '../explorerTrajectories';

const PAGE_SIZE = 60;

Meteor.methods({
    loadUserFlights(page)
    {
        if (page === undefined || page <= 0) {
            console.error("requesting invalid page: " + page);
            return {};
        }
        
        // page: 1-based page number
        // TODO: don't use skip
        const db_fligths = trajectories.find(
            {"userId": Meteor.userId()},
            {
            "sort": {created: -1}, 
            "skip": ((page-1)*PAGE_SIZE), 
            "limit": PAGE_SIZE,
            "fields": {"path": 0, "svg": 0}
        });

        let obj = {};
        obj.flights = db_fligths.fetch();
        obj.count = db_fligths.count();

        return obj;
    },
    loadFlightPath(id) {
        console.log("load flight path: " + id);
        
        const db_fligths = trajectories.find(
            {"_id": id},
            {"fields": {"path": 1}}
        );

        var data = db_fligths.fetch();
        console.log("dat: " + data);
         
        return data;
    }
});