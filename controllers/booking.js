const mongoose = require("mongoose");
const Booking = require("../models/booking");
const Customer = require("../models/customer");
const Room = require("../models/room");

exports.create = async (req, res) => {
  const {
    name,
    address,
    phoneNumber,
    roomNumber,
    checkInDate,
    checkOutDate,
    totalAmount,
  } = req.body;
  try {
    const roomData = await Room.findOne({ roomNumber: roomNumber }).exec();

    if (!roomData) {
      return res.status(404).send({ message: "Room not found." });
    }

    if (roomData.isAvailable === false) {
      return res
        .status(400)
        .send({ message: "Room is currently occupied or under maintenance." });
    }

    const newCustomer = new Customer({
      name,
      address,
      phoneNumber,
    });
    const customerData = await newCustomer.save();

    const bookingData = await Booking.create({
      customerId: customerData._id,
      roomId: roomData._id,
      checkInDate,
      checkOutDate,
      totalAmount,
      status: "pendingConfirmation",
    });

    await Room.findOneAndUpdate(
      { _id: roomData._id },
      {
        $set: { isAvailable: false },
      },
      {
        new: true,
      }
    ).exec();

    res
      .status(201)
      .send({ message: "Create booking successful", data: bookingData });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Booking.find({}).exec();
    res
      .status(200)
      .send({ message: "Fetch booking list successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Booking.findById(id).exec();

    if (!data) {
      return res.status(404).send({ message: "Booking not found." });
    }

    res.status(200).send({ message: "Fetch booking successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!data) {
      return res.status(404).send({ message: "Booking not found for update." });
    }

    res
      .status(200)
      .send({ message: "Update booking successful! ", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const bookingData = await Booking.findById(id).exec();

    if (!bookingData) {
      return res
        .status(404)
        .send({ message: "Booking not found for cancellation." });
    }

    await Room.findOneAndUpdate(
      { _id: bookingData.roomId },
      {
        $set: {
          isAvailable: true,
        },
      },
      { new: true }
    ).exec();

    await Booking.findByIdAndDelete(id).exec();

    res.status(200).send({ message: "Cancellation successful!" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
