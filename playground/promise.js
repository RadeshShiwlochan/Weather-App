const request = require( 'request' );

let geocodeAddress = ( address ) => {
    return new Promise( ( resolve, reject ) => {
	    let encodedURI = encodeURIComponent( address );
	    request( {
	    	url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
	    	json : true
	    }, ( err, res, body ) => {
               if ( err ) 
                   reject( "Unable to connect");
               else {
                   resolve( {
                   	   address: body.results[0].formatted_address,
	    		       latitude: body.results[0].geometry.location.lat,
	    		       longitude: body.results[0].geometry.location.lng
                   }); //resolve
               }//else 
	    });//request
	})//return    
}//geocodeAddress

geocodeAddress('19146').
    then( (location) => {
        console.log( JSON.stringify( location, undefined, 2 ))
    }, ( errMessage ) => {
	    console.log( errMessage );
});