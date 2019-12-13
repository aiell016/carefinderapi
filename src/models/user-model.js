let moongoose = require('mongoose');
const schema = moongoose.Schema;
const errorMessages = require('../middleware/error-messages');

const definition = new schema ({
    'firstName': {type: String, trim: true, required: errorMessages.error.MISSING_FIRSTNAME},
    'lastName': {type: String, trim: true, required: errorMessages.error.MISSING_LASTNAME},
    'email': {type: String, trim: true, required: errorMessages.error.MISSING_EMAIL},
    'password': {type: String, trim: true,required: errorMessages.error.MISSING_PASSWORD},
    'admin': {type: Boolean, default: false}
});

const options = {
    timestamp: true
};

const Schema = new moongoose.Schema(definition, options);

module.exports = moongoose.model('users',Schema);
