const validatorjs = require('validatorjs');

class ValidatorUtils {

    constructor() {

        this.customMessages = {
            'required': 'Este campo es requerido',
            'email': 'email invalido'
        };

    }

    makeValidation( params = {}, rules = {} ) {

        return new validatorjs( params, rules, this.customMessages );
        
    }

}

const validatorUtils = new ValidatorUtils();

module.exports = validatorUtils;