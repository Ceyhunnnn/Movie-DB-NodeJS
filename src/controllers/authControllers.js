const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/error");
const Response = require("../utils/response");
const login = async (req, res) => {
  return res.json(req.body);
};
const register = async (req, res) => {
  const { email } = req.body;
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Already email", 401);
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const newUser = new user(req.body);
  await newUser
    .save()
    .then((data) => new Response(data, "Success saved").created(res))
    .catch((err) => new APIError("Save not success", 400));
};
module.exports = { login, register };
