const express = require("express");
const router = express.Router();
const data = require("../controllers/i-controller");

router.route("/idata").get(influencerdata);

module.exports = router;
