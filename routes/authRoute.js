const express = require("express");
const { loginHandler } = require("../controller/authController");
const  isLoggedIn = require("../Middlewares/isLoggedIn");
const auth_router = express.Router();

auth_router.post("/signin",isLoggedIn,loginHandler)

module.exports = auth_router;

// type of import and export in javascript 