var getUser = ( id, callback ) => {
    var user = {
        id: id,
        name: 'charizard'
    };
    setTimeout( () => {
    	callback( user );
    }, 2000 );
};

getUser( 32, ( userObject ) => {
    console.log( userObject );
});