import '../imports/api/flights/server/insertFlight';
import '../imports/api/flights/server/loadFlights';
import '../imports/api/flights/server/loadUserFlights';
import '../imports/api/flights/server/loadSvg';

import { fetch, Headers } from 'meteor/fetch';


Meteor.methods({
    'kml.download'({ url }) {

        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        const f = fetch(url, {headers: myHeaders})
            .then(response => response.text())
            .then(xml => {
                return xml;
            });
        
        return f;
    }
});