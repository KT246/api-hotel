const mongoose = require("mongoose");
// require("dotenv").config();
const connectedDB = async () => {
  const URI = process.env.URL_DATABASE;
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB...!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectedDB;
