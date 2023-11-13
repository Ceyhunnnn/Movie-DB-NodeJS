const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/error");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
const moment = require("moment");

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await user.findOne({ email });
  if (!loginUser)
    throw new APIError(
      "Mail adresi veya parola hatalı, lütfen tekrar deneyin.",
      401
    );
  const comparePassword = await bcrypt.compare(password, loginUser.password);
  if (!comparePassword)
    throw new APIError(
      "Mail adresi veya parola hatalı, lütfen tekrar deneyin.",
      401
    );
  createToken(loginUser, res);
};
const register = async (req, res) => {
  const { email } = req.body;
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError(
      "Böyle bir email adresi mevcut, lütfen farklı bir email adresi ile deneyiniz",
      401
    );
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const newUser = new user(req.body);
  await newUser
    .save()
    .then((data) => new Response(data, "Kayıt başarılı").created(res))
    .catch(
      (err) => new APIError("Kayıt başarısız, lütfen tekrar deneyin", 400)
    );
};
const me = async (req, res) => {
  return new Response(req.user, "Basarili").success(res);
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const userInfo = await user.findOne({ email }).select(" name surname email");
  if (!userInfo) {
    throw new APIError(
      "Geçersiz mail adresi, lütfen geçerli bir mail adresi girin",
      400
    );
  }
  const resetCode = crypto.randomBytes(3).toString("hex");
  await sendEmail({
    from: process.env.EMAIL_USER,
    to: userInfo.email,
    subject: "Şifre sıfırlama",
    text: `Şifre sıfırlama kodunuz ${resetCode}`,
  });
  await user.updateOne(
    { email },
    {
      reset: {
        code: resetCode,
        time: moment(new Date())
          .add(15, "minute")
          .format("YYYY-MMM-DD HH:mm:ss"),
      },
    }
  );
  return new Response(true, "Lütfen mail adresinizi kontrol ediniz").success(
    res
  );
};
module.exports = { login, register, me, forgetPassword };
