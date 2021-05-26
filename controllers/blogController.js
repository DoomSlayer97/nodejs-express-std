const requestUtils = require("../utils/requestUtils");
const responseUtils = require("../utils/responseUtils");
const bcrypt = require('bcrypt');

const { User } = require('../models');
const validatorUtils = require("../utils/validatorUtils");

function validate( bodyParams ) {

    const validator = validatorUtils.makeValidation( bodyParams, {
        username: 'required',
        email: 'required|email',
        password: 'required'
    });

    return validator;

}

module.exports.create = async ( req, res ) => {
    try {

        const bodyParams = requestUtils.getParams( req, [ 'username', 'email', 'password' ] );

        bodyParams.password = bcrypt.hashSync( bodyParams.password, 12 );

        const validator = validate( bodyParams );

        if ( validator.fails() ) return res
            .status(400)
            .json({
                message: 'invalid_params',
                errors: validator.errors.errors
            });

        const user = await User.create( bodyParams );

        if ( !user ) return res
            .status(400)
            .json({
                message: 'error_save'
            });

        return res
            .status(201)
            .json({
                message: 'created',
                user
            });
        
    } catch (e) {

        return responseUtils.errorServerResponse( res, e );
        
    }
}
