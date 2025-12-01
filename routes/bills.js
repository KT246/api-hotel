const express = require("express");
const route = express.Router();
const { create, list, read, remove } = require("../controllers/bills");
const { checkAuthen, checkRole } = require("../middlewares/auth");

// let checked = [checkAuthen, checkRole];
route.post("/bills", create);
route.get("/bills", list);
route.get("/bills/:id", read);
route.delete("/bills/:id", remove);

module.exports = route;
