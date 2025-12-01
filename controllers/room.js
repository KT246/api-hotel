const mongoose = require("mongoose");
const Room = require("../models/room");

exports.create = async (req, res) => {
  try {
    const data = await Room.create(req.body);
    res.status(201).send({ message: "Create room successful!", data: data });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ message: "Room number already exists." });
    }
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Room.find({}).exec();
    res.status(200).send({ message: "Fetch room list successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Room.findById(id).exec();

    if (!data) {
      return res.status(404).send({ message: "Room not found." });
    }

    res.status(200).send({ message: "Fetch room successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!data) {
      return res.status(404).send({ message: "Room not found for update." });
    }

    res.status(200).send({ message: "Update room successful!", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const roomData = await Room.findById(id).exec();

    if (!roomData) {
      return res.status(404).send({ message: "Room not found for deletion." });
    }

    // Kiểm tra trạng thái isAvailable (true/false)
    if (roomData.isAvailable === false) {
      return res
        .status(400)
        .send({ message: "Room is currently occupied and cannot be deleted." });
    }

    await Room.findByIdAndDelete(id).exec();
    res.status(200).send({ message: "Delete room successful!" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
