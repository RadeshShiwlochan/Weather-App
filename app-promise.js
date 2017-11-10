const yargs = require( 'yargs' );
const axios = require ( 'axios' );
require ( 'dotenv' ).config();
const apiKey = process.env.API_KEY; 

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

let encodedAddress = encodeURIComponent( argv.address );
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}` 

axios.get( geocodeUrl ).then( ( res ) => {
    if ( res.data.status === 'ZERO_RESULTS' ) {
        throw new Error( 'Unable to find that address' );
    }
    let lat = res.data.results[0].geometry.location.lat;
    let lng = res.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`
    console.log( res.data.results[0].formatted_address );
    return axios.get( weatherUrl ); 
}).then( (res) => {
    let temperature = res.data.currently.temperature;
    let apparentTemp = res.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature}. It feels like ${apparentTemp}`);
}).catch( ( err ) => {
    if ( err.code === 'ENOTFOUND' ) {
        console.log ( "Unable to connect to API servers" );
    } else {
          console.log( err.message );
    }
});     
