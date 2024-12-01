const Infludata = require("../models/influencer-model");

const influ = async (req, res) => {
  try {
    const responce = req.body;
    const formcreated = await Infludata.create(responce);

    res.status(200).json(req.body);
    // console.log("successfuly saved");
    //
  } catch (error) {
    console.log(error);
  }
};

module.exports = influ;
