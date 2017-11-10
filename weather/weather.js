const request = require( 'request' );
require('dotenv').config();

const apiKey = process.env.API_KEY; 

let getWeather = ( lat, long, callback ) => {
	request( {
	    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`,
	    json: true
    }, ( err, res, body ) => {
	    if ( !err && res.statusCode === 200 ) {
            callback( undefined, {
            	temperature : body.currently.temperature,
            	apparentTemperature: body.currently.apparentTemperature
            } ); 
        } else {
        	callback( "Unable to get weather information" );
        }
    });
}

module.exports.getWeather = getWeather;

