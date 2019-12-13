const express = require("express");
let router = express.Router();

/**
 * Shows API Version & Info
 * GET /
 */
router.get("/",  async (req, res) => {
    res.status(200).send({
        "name": "CareFinderApi",
        "developer": "Client/Server Dev",
        "version": "1.0.0"
    });
});

module.exports = router;
