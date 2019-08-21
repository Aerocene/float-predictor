class Trajectory {

    constructor() {
        // add object version
        // version 2: move to mongodb
        this.version = 2;
    }

    load = function(viz, departure, destination, data, explorer, altitude, svg) {

        // viz: Visualisation object
        // departure: departure object
        // destination: destination object
        // data: path in geo-data
        // explorer: winning explorer object
        // altitude: altitude
        // svg: svg xml string 

        const departureDate = new Date(viz.startingDate);// this.valueOf()
        departureDate.setDate(departureDate.getDate() + viz.minTrack);

        this.departure_city = departure.city;
        this.departure_country = departure.country;
        this.departure_latitude = departure.lat;
        this.departure_longitude = departure.lng;

        this.min_dist = viz.minDist;
        this.min_time = this.minTime;
        this.departure_date = departureDate.toISOString();
        this.speed = explorer.avgSpeed;
        this.altitude = altitude;
        this.distance = explorer.getTotalDistance() * 0.001;
        this.path = data;
        this.svg = svg;
        this.svgB64 = "data:image/svg+xml;base64," + btoa(svg);
        //this.explorerIndex = viz.minTrack;

        if (viz.flightType === 'planned') {
            this.destination_city = destination.city;
            this.destination_country = destination.country;
            this.destination_latitude = destination.lat;
            this.destination_longitude = destination.lng;
        } else {
            this.destination = undefined;
        }

        this.email = null;
        this.ip = null;
    }
}

export default Trajectory;