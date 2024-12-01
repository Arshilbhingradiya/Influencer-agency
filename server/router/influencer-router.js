const express = require("express");
const router = express.Router();
const influ = require("../controllers/influencer-controller");

router.post("/influencerdata", influ);

module.exports = router;
