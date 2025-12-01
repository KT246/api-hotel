const express = require("express");
const route = express.Router();
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/booking");

route.post("/booking", create);
route.get("/booking", list);
route.get("/booking/:id", read);
route.delete("/booking/:id", remove);
route.put("/booking/:id", update);

module.exports = route;
