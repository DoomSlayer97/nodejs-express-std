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

function getBodyParams( req ) {
    return requestUtils.getParams( req, [ 'username', 'email', 'password' ] );
}

module.exports.create = async ( req, res ) => {
    try {

        const bodyParams = getBodyParams();

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

module.exports.findAll = async ( req, res ) => {
    try {

        const {
            page,
            items
        } = req.query;

        const rows = await User.findAll();

        return res
            .json( rows );
        
    } catch (e) {

        return responseUtils.errorServerResponse( res, e );

    }
}

module.exports.findOne = async ( req, res ) => {
    try {

        const { id } = req.params;

        const row = await User.findByPk( id );

        return res
            .json(row);
        
    } catch (e) {
        
        return responseUtils.errorServerResponse( res, e );

    }
}

module.exports.update = async ( req, res ) => {
    try {

        const { id } = req.params;

        const bodyParams = getBodyParams();

        bodyParams.password = bcrypt.hashSync( bodyParams.password, 12 );

        const validator = validate( bodyParams );

        if ( validator.fails() ) return res
            .status(400)
            .json({
                message: 'invalid_params',
                errors: validator.errors.errors
            });

        const user = await User.update( bodyParams, { where: { id } });

        if ( !user ) return res
            .status(400)
            .json({
                message: 'error_save'
            });

        return res
            .status(201)
            .json({
                message: 'saved'
            });
        
    } catch (e) {
        
        return responseUtils.errorServerResponse( res, e );

    }
}

module.exports.deleteOne = async ( req, res ) => {
    try {

        const { id } = req.params;
        
        await User.deleteOne( { where: { id } } );

        return res
            .status( 202 )
            .json({
                message: 'deleted'
            });
        
    } catch (e) {

        return responseUtils.errorServerResponse( res, e );
        
    }
}

