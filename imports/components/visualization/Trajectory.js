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

        this.departure = {
            city: departure.city,
            country: departure.country,
            coordinates: {
                latitude: departure.lat,
                longitude: departure.lng,
            },
        };
        
        this.min_dist = viz.minDist;
        this.min_time = this.minTime;
        this.departure_date = departureDate.toISOString();
        this.speed = explorer.avgSpeed;
        this.altitude = altitude;
        this.distance = explorer.getTotalDistance() * 0.001;
        this.path = data;
        this.svg = svg;
        this.svgB64 = "data:image/svg+xml;base64," + btoa(svg);
        this.explorerIndex = viz.minTrack;

        if (viz.flightType === 'planned') {
            this.destination = {
              city: destination.city,
              country: destination.country,
              coordinates: {
                latitude: destination.lat,
                longitude: destination.lng,
              },
            };
        } else {
            this.destination = undefined;
        }
    }
}

export default Trajectory;