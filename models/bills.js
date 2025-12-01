const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    roomTotal: Number,
    totalAmount: Number,
    paymentDate: Date,
    paymentMethod: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
