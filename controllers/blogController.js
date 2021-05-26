const requestUtils = require("../utils/requestUtils");
const responseUtils = require("../utils/responseUtils");
const bcrypt = require('bcrypt');

const { Blog } = require('../models');
const validatorUtils = require("../utils/validatorUtils");

function validate( bodyParams ) {

    const validator = validatorUtils.makeValidation( bodyParams, {
        title: 'required',
        content: 'required',        
    });

    return validator;

}

function getBodyParams(req) {

    return requestUtils.getParams( req, [ 'content', 'title' ] );

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

        const blog = await Blog.create( bodyParams );

        if ( !blog ) return res
            .status(400)
            .json({
                message: 'error_save'
            });

        return res
            .status(201)
            .json({
                message: 'created',
                blog
            });
        
    } catch (e) {

        return responseUtils.errorServerResponse( res, e );
        
    }
}

module.exports.findAll = async ( req, res ) => {
    try {

        const blogs = await Blog.findAll();

        return res
            .json( blogs );
        
    } catch (e) {

        return responseUtils.errorServerResponse( res, e );
        
    }
}

module.exports.findOne = async ( req, res ) => {
    try {

        const { id } = req.params;

        const blog = await Blog.findByPk( id );

        return res
            .json( blog );
        
    } catch (e) {
        return responseUtils.errorServerResponse( res, e );        
    }
}

