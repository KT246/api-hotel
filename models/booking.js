const mongoose = require("mongoose");
const { type } = require("os");

const BookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    checkInDate: Date,
    checkOutDate: Date,
    totalAmount: Number,
    status: {
      type: String,
      default: "pendingConfirmation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
