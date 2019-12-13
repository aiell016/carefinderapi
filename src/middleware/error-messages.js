const error = {
    // Error messages that handle user model
    MISSING_FIRSTNAME: 'Missing the required property: [contactInfo: firstName]',
    MISSING_LASTNAME: 'Missing the required property: [contactInfo: lastName]',
    MISSING_EMAIL: 'Missing the required property: [email address]',
    MISSING_PASSWORD: 'Missing the required property: [password]',
    // Error messages that handle hospital model
    MISSING_PROVIDER_ID: 'Missing the required field from XML: [provider_id]',
    MISSING_HOSPITAL_NAME: 'Missing the required field from XML: [hospital_name]',
    MISSING_ADDRESS: 'Missing the required field from XML: [address]',
    MISSING_CITY: 'Missing the required field from XML: [city]',
    MISSING_STATE: 'Missing the required field from XML: [state]',
    MISSING_ZIPCODE: 'Missing the required field from XML: [zip_code]',
    MISSING_COUNTY: 'Missing the required field from XML: [county_name]',
    MISSING_PHONE_NUMBER: 'Missing the required field from XML: [phone_number]',
    MISSING_HOSPITAL_TYPE: 'Missing the required field from XML: [hospital_type]',
    MISSING_HOSPITAL_OWNERSHIP: 'Missing the required field from XML: [hospital_ownership]',
    MISSING_EMERGENCY_SERVICES: 'Missing the required field from XML: [emergency_services]',
    MISSING_HUMAN_ADDRESS: 'Missing the required field from XML: [human_address]',
    MISSING_LAT: 'Missing the required field from XML: [latitude]',
    MISSING_LONG: 'Missing the required field from XML: [longitude]'
};

const success = {

};

module.exports = {error, success};