const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, age, followers, gender, bio, image_url } = req.body;
      const serviceCreated = await Service.create({
        name,
        age,
        followers,
        gender,
        bio,
        image_url,
      });
      return res.status(201).json({ msg: "Service created successfully", service: serviceCreated });
    } else if (req.method === 'GET') {
      const services = await Service.find({});
      if (!services || services.length === 0) {
        return res.status(404).json({ message: "No services found" });
      }
      return res.status(200).json(services);
    }
  } catch (error) {
    console.log("service error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = services;
