const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phoneNumber: String,
    email: String,
    password: String,
    imageUrl: String,
    role: {
      type: String,
      default: "user",
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
