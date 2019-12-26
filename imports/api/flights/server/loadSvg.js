import trajectories from '../explorerTrajectories';

Meteor.methods({
    loadSvg(id) { 
        const db_flights = trajectories.find(
            {"_id": id},
            {"fields": {"svg": 1}}
        );
        const arr = db_flights.fetch();
        if (arr.length > 0) {
            return arr[0].svg;            
        }
    },
});