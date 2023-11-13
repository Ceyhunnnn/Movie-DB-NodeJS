const nodeMailer = require("nodemailer");
const sendEmail = async (mailOptions) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("err : ", err);
    }
    console.log("info : ", info);
    return true;
  });
};

module.exports = sendEmail;
