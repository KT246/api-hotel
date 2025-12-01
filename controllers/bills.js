const Bill = require("../models/bills");

exports.create = async (req, res) => {
  try {
    const data = await Bill.create(req.body);
    res.status(201).send({ message: "Create bill successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Bill.find({}).exec();
    res.status(200).send({ message: "Fetch bill list successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Bill.findById(id).exec();

    if (!data) {
      return res.status(404).send({ message: "Bill not found." });
    }

    res.status(200).send({ message: "Fetch bill successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Bill.findByIdAndDelete(id).exec();

    if (!result) {
      return res.status(404).send({ message: "Bill not found for deletion." });
    }

    res.status(200).send({ message: "Delete bill successful!" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
