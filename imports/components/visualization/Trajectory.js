import calculateAerochange from '../../api/flights/calculateAerochange';
import convertKilometersToNauticalMiles from '../../api/flights/convertKilometersToNauticalMiles';
import calculateCO2PerKilometers from '../../api/flights/calculateCO2PerKilometers';
import Util from './Util';

class Trajectory {

    constructor() {
        // add object version
        // version 2: move to mongodb
        // version 3: use tawhiri data (trajectory gps-points only)
        // version 4: use complete returned data (not only the trajectory)
        this.version = 4;
    }

    load(viz, departure, destination, explorer, altitude, svg, type) {

        // viz: Visualisation object
        // departure: departure object
        // destination: destination object        
        // explorer: winning explorer object
        // altitude: altitude
        // svg: svg xml string 

        let distanceToTravel = 0;

        const departureDate = new Date(viz.startingDate);
        departureDate.setDate(departureDate.getDate() + viz.minTrack);

        this.departure_city = departure.city;
        this.departure_country = departure.country;
        this.departure_latitude = departure.lat;
        this.departure_longitude = departure.lng;

        this.min_dist = viz.minDist; // km
        this.min_time = viz.minTime;
        this.departure_date = departureDate.toISOString();
        this.speed = explorer.avgSpeed;
        this.altitude = altitude;
        this.distance = explorer.getTotalDistance() * 0.001;
        this.path = explorer.originalData; // data from server
        this.svg = svg;
        this.svgB64 = "data:image/svg+xml;base64," + btoa(svg);

        this.balloon_type = type;

        this.totalKilometers = explorer.getTotalDistance();
        this.totalNauticalMiles = convertKilometersToNauticalMiles(explorer.getTotalDistance());

        if (viz.flightType === 'planned') {
            this.destination_city = destination.city;
            this.destination_country = destination.country;
            this.destination_latitude = destination.lat;
            this.destination_longitude = destination.lng;

            // distance we tried to travel
            distanceToTravel = Util.getDistanceFromLatLonInKm(departure.lat, departure.lng, destination.lat, destination.lng);

            if (this.min_dist <= distanceToTravel) {
                // we got closer (ot at least as far away) to the target and saved some CO2
                this.savedCO2InKilograms = calculateCO2PerKilometers(distanceToTravel - this.min_dist);
            } else {
                // we could not get closer to destination
                // no CO2 saved
                this.savedCO2InKilograms = 0;
            }
        } else {

            this.savedCO2InKilograms = calculateCO2PerKilometers(this.min_dist);
        }

        this.earnedAeros = calculateAerochange(this);

        // needed?
        this.email = null;
        this.ip = null;
    }
}

export default Trajectory;