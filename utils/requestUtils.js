
class RequestUtils {

    getParams( req, bodyRequestParams = [] ) {

        let bodyParams = {};

        bodyRequestParams.forEach( ( item, index ) => {    
            
            bodyParams[item] = req.body[item];

        });

        return bodyParams;

    }

}

const requestUtils = new RequestUtils();

module.exports = requestUtils;
