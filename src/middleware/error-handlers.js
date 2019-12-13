// https://github.com/wesbos/Learn-Node/blob/master/stepped-solutions/45%20-%20Finished%20App/handlers/errorHandlers.js

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 */
exports.catchErrors = (action) => {
    return (req, res, next) => {
        action(req, res).catch(next)
    }
};

/**
 * Validation error handler for Mongo.
 * The client app should handle displaying the errors.
 */
exports.validationErrors = (err, req, res, next) => {
    // catch unique field error
    if (err.code && err.code === 11000) {
        err.status = 400;
        err.message = err.errmsg;
        return next(err)
    }
    
    if (!err.errors) {
        return next(err)
    }
    res.status(400).json({
        status: 400,
        error: err.errors,
        data: {}
    })
};

/**
 * Show useful information to client in development.
 */
exports.development = (err, req, res, next) => {
    console.log(err);
    err.stack = err.stack || '';
    const status = err.status || 500;
    res.status(status);
    res.json({
        status,
        error: {
            message: err['message']
        },
        data: {}
    })
};

/**
 * Do not show errors in production.
 */
exports.production = (err, req, res, next) => {
    if (err.status && err.status === 404) {
        if (req.accepts('json')) {
            res.json(err)
        } else {
            res.redirect('/')
        }
    } else {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        })
    }
};

/**
 * Handle any invalid routes.
 */
exports.invalidRoute = (req, res) => {
    let error = new Error();
    error.status = 404;
    error.code = "invalid-route";
    error.message = "Invalid Route";
    console.error(error.status, error.message);
    return res.status(error.status).send(error)
};

/**
 * Create error with Status & Message
 */
exports.createError = (status, code, res, message) => {
    try {
        let error = new Error();
        error.status = status || 500;
        error.code = code;
        switch (code) {
            case "invalid-token" :
                error.message = "Authentication failed. IdToken is Invalid.";
                break;
            case "no-token" :
                error.message = "No Token in header.";
                break;
            case "id-token-revoked" :
                error.message = "Authentication failed. IdToken has been revoked.";
                break;
            case "not-authorized" :
                error.message = "Not Authorized. Admin Access Required.";
                break;
            case "not-found" :
                error.message = "No Document Found.";
                break;
            case "missing-required" :
                error.message = "Missing Required Fields.";
                break;
            case "internal-error" :
                error.message = "Internal Error Occurred";
                break;
            default :
                error.message = message !== undefined ? message : "Internal Server Error"
        }
        return res.status(error.status).send(error)
    }catch (e) {
        console.error(e);
    }
};
