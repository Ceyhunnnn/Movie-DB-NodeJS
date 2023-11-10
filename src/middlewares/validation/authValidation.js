const joi = require("joi");
const APIError = require("../../utils/error");

class AuthValidation {
  constructor() {}

  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(20).required().messages({
            "string.base": "İsim alanı normal metin olmalıdır.",
            "string.empty": "İsim alanı boş olamaz.",
            "string.min": "İsim alanı en az 3 karakter olmalıdır.",
            "string.max": "İism alanı en fazla 20 karakter olmalıdır.",
            "string.required": "İsim alanı zorunludur.",
          }),
          surname: joi.string().trim().min(3).max(20).required().messages({
            "string.base": "Soy isim alanı normal metin olmalıdır.",
            "string.empty": "Soy isim alanı boş olamaz.",
            "string.min": "Soy isim alanı en az 3 karakter olmalıdır.",
            "string.max": "Soy isim alanı en fazla 20 karakter olmalıdır.",
            "string.required": "Soy isim alanı zorunludur.",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(20)
            .required()
            .messages({
              "string.base": "Email alanı normal metin olmalıdır.",
              "string.empty": "Email alanı boş olamaz.",
              "string.email": "Lütfen geçerli bir mail adresi girin",
              "string.min": "Email alanı en az 3 karakter olmalıdır.",
              "string.max": "Emailm alanı en fazla 20 karakter olmalıdır.",
              "string.required": "Email alanı zorunludur.",
            }),
          password: joi.string().trim().min(6).max(20).required().messages({
            "string.base": "Parola alanı normal metin olmalıdır.",
            "string.empty": "Parola alanı boş olamaz.",
            "string.min": "Parola alanı en az 6 karakter olmalıdır.",
            "string.max": "Parola alanı en fazla 20 karakter olmalıdır.",
            "string.required": "Parola alanı zorunludur.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else throw new APIError("Lütfen Validasyon kurallarına uyunuz", 400);
    }
    next();
  };
}

module.exports = AuthValidation;
