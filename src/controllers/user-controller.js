const User = require('../models/user-model');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config/config');
let errorHandler = require("../middleware/error-handlers");

exports.store = async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hashSync(req.body.password, 8);
        
        const user = new User(req.body);
        user.password = hashedPassword;
        user.admin = false;
        
        await user.save().then(() => {
            res.status(201).send("User Created");
        }).catch(reason => res.send(reason));
    } catch (err) {
        errorHandler.createError(400, err.code, res, err.message)
    }
};

exports.storeAdmin = async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hashSync(req.body.password, 8);
        
        const user = new User(req.body);
        user.password = hashedPassword;
        
        await user.save().then(() => {
            res.status(201).send("User Created");
        }).catch(reason => res.send(reason));
    } catch (err) {
        errorHandler.createError(400, err.code, res, err.message)
    }
};

exports.me = async (req, res) => {
    const user = await User.find({email: req.body.email}, {password: 0}).exec();
    await res.json(user)
};

exports.login = async (req, res) => {
    try {
        await User.findOne({email: req.body.email}).then(response => {
            //if (err) return res.status(500).send('Error on the server.');
            if (response == null) {
                return res.status(404).send('No user found.');
            }
            
            let passwordIsValid = bcrypt.compareSync(req.body.password, response.password);
            
            if (!passwordIsValid) {
                return res.status(401).send({auth: false, token: null});
            } else {
                let token = jwt.sign({id: response._id}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({auth: true, token: token, admin: response.admin});
            }
        }).catch(reason => res.send(reason));
    } catch (e) {
        res.send(e);
    }
};

exports.logout = async (req, res) => {
    res.status(200).send({auth: false, token: null});
};

exports.getAllUser = async (req, res) => {
    const user = await User.find({}, {password: 0}).exec();
    await res.json({data: user})
};

exports.deleteAllUsers = async (req, res) => {
    try {
        let newId = new mongoose.mongo.ObjectId(req.body.id);
        await User.deleteMany({_id: !newId}).exec().catch(reason => console.log(reason));
        res.status(200).send("Deleted All users, except you")
    } catch (err) {
        errorHandler.createError(400, err.code, res, err.message)
    }
};

exports.deleteSpecificUser = async (req, res) => {
    await User.delete({
        email: req.params.email
    }).exec()
        .then(res.status(204).send())
        .catch(reason => res.send(reason));
};
