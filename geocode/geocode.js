const request = require( 'request' );

let geocodeAddress = ( address, callback ) => {
	let encodedURI = encodeURIComponent( address );
	request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
	json: true
    }, ( err, res, body ) => {
	    if ( err ) {
	        callback( 'Unable to connect to Google Servers' );
	    } else if ( body.status === 'ZERO_RESULTS' ) {
            callback( 'Unable to find address' );
	    } else if ( body.status === 'OK' ) {
	    	callback( undefined, {
	    		address: body.results[0].formatted_address,
	    		latitude: body.results[0].geometry.location.lat,
	    		longitude: body.results[0].geometry.location.lng
	    	});
        }      
    });
}

module.exports.geocodeAddress = geocodeAddress;
