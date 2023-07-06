const { register, login, validate } = require("../controllers/authController");

const express = require("express");
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/validate").post(validate);

module.exports = authRouter;
