const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: (req, res) => {
    if (req.url === "/login" || req.url === "/register") return 5;
    else return 100;
  },
  message: {
    success: false,
    message: "Çok fazla istekte bulundunuz !",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
