const Companydata = require("../models/company-model");

const companydata = async (req, res) => {
  try {
    const responce = req.body;
    const formcreated = await Companydata.create(responce);

    res.status(200).json(req.body);
    // console.log("successfuly saved");
    //
  } catch (error) {
    console.log(error);
  }
};

module.exports = companydata;
