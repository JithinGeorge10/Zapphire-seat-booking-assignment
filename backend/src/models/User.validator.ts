import validator from "validator";

// Password regex for at least one uppercase, one lowercase, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

const validationMessages = {
  username: "Username should be alphanumeric and between 3 and 50 characters long",
  email: "Invalid email format",
  phone: "Invalid phone number format",
  password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
};

const usernameValidator = (value: string) => {
  return validator.isAlphanumeric(value) && validator.isLength(value, { min: 3, max: 50 });
};

const emailValidator = (value: string) => {
  return validator.isEmail(value);
};

const phoneValidator = (value: string) => {
  return validator.isMobilePhone(value);
};

const passwordValidator = (value: string) => {
  return passwordRegex.test(value);
};



export const userValidators = {
  username: {
    validator: usernameValidator,
    message: validationMessages.username,
  },
  email: {
    validator: emailValidator,
    message: validationMessages.email,
  },
  phone: {
    validator: phoneValidator,
    message: validationMessages.phone,
  },
  password: {
    validator: passwordValidator,
    message: validationMessages.password,
  }
};
