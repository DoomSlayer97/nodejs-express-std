const { Errorlog } = require('../models')

class ResponseUtils {

    constructor() {

        this.isDev = true;

    }

    saveErrorLog( error ) {

        Errorlog.create( { name: error.toString() } );

    }

    errorServerResponse( res, error ) {

        let responseJson = {
            message: 'internal_error',
        };

        if ( this.isDev ) {
            
            responseJson.error = error;
            
        }

        this.saveErrorLog( error );

        return res
            .status( 500 )
            .json( responseJson );

    }


}

const responseUtils = new ResponseUtils();

module.exports = responseUtils;
