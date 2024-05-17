export const validateFirstName = (value) =>
  value.length === 0 || value.length < 2
    ? "Name must have at least 2 letters"
    : null;

export const validateLastName = (value) =>
  value.length < 2 ? "Name must have at least 2 letters" : null;

export const validateAddress = (value) =>
  value.length < 5 ? "Address must have at least 5 letters" : null;

export const validateEmail = (value) =>
  /^\S+@\S+$/.test(value) ? null : "Invalid email";

export const validatePassword = (value) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (value.length < minLength) {
    return "Password must be at least 8 characters long";
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter";
  }
  if (!hasNumber) {
    return "Password must contain at least one number";
  }
  if (!hasSymbol) {
    return "Password must contain at least one symbol";
  }
  return null;
};

export const validateConfirmPassword = (value, values) =>
  value !== values.password ? "Passwords did not match" : null;
