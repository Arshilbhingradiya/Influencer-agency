const express = require("express");
const router = express.Router();
const companydata = require("../controllers/company-controller");

router.post("/companydata", companydata);

module.exports = router;
