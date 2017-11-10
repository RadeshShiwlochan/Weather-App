const yargs = require( 'yargs' );

const geocode = require( './geocode/geocode.js' ); //can leave out js extension 
const weather = require( './weather/weather.js' );

require( 'dotenv' ).config();

let inputAddress = "";

const argv = yargs
    .options( {
        a: {
        	demand: true,
        	alias: 'address',
        	describe: 'Address to fetch weather for',
        	string: true
        }
    })
      .help()
      .alias( 'help', 'h' )
      .argv;

//argv gets command line input, set inputAddress to address field, then encode it for API endpoint call
inputAddress = argv.address;
geocode.geocodeAddress( inputAddress , ( errMessage , results ) => {
	if ( errMessage ) console.log( errMessage );
	else {
		console.log( results.address ); 
		weather.getWeather( results.latitude, results.longitude, ( err, weatherResults ) => {
            if ( err ) console.log( "Unable to retrieve weather information" );
            else console.log ( `Temperature is ${weatherResults.temperature} feels like ${weatherResults.apparentTemperature}` );
        } );
	}
});




