const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    roomType: {
      type: String,
    },
    pricePerNight: {
      type: Number,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
