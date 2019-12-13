let express = require('express');
let router = express.Router();

let hospitalRoutes = require('./hospital-routes');
let userRoutes = require('./user-routes');
let indexRoute = require('./index-routes');

router.use('/', indexRoute);
router.use('/users', userRoutes);
router.use('/hospitals', hospitalRoutes);

module.exports = router;
