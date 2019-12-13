let moongoose = require('mongoose');
const schema = moongoose.Schema;
const errorMessages = require('../middleware/error-messages');

const definition = new schema ({
    'provider_id': {type: String, trim: true, required: errorMessages.error.MISSING_PROVIDER_ID},
    'hospital_name': {type: String, trim: true, required: errorMessages.error.MISSING_HOSPITAL_NAME},
    'address': {type: String, trim: true, required: errorMessages.error.MISSING_ADDRESS},
    'city': {type: String, trim: true, required: errorMessages.error.MISSING_CITY},
    'state': {type: String, trim: true, required: errorMessages.error.MISSING_STATE},
    'zip_code': {type: String, trim: true, required: errorMessages.error.MISSING_ZIPCODE},
    'county_name': {type: String, trim: true, required: errorMessages.error.MISSING_COUNTY},
    'phone_number': {type: String, trim: true, required: errorMessages.error.MISSING_PHONE_NUMBER},
    'hospital_type': { type: String, trim: true, required: errorMessages.error.MISSING_HOSPITAL_TYPE},
    'hospital_ownership': { type: String, trim: true, required: errorMessages.error.MISSING_HOSPITAL_OWNERSHIP},
    'emergency_services': { type: Boolean, trim: true, required: errorMessages.error.MISSING_EMERGENCY_SERVICES},
    'location': {
        'latitude': { type: String, trim: true, required: errorMessages.error.MISSING_LAT},
        'longitude': { type: String, trim: true, required: errorMessages.error.MISSING_LONG}
    }
});

const options = {
    timestamp:true
};

const Schema = new moongoose.Schema(definition, options);

module.exports = moongoose.model('hospitals', Schema);
