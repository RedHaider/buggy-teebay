export const validateFirstName = (value) =>
  value.trim().length === 0 || value.trim().length < 2
    ? "Name must have at least 2 letters"
    : null;

export const validateLastName = (value) =>
  value.trim().length < 2 ? "Name must have at least 2 letters" : null;

export const validateAddress = (value) =>
  value.trim().length < 5 ? "Address must have at least 5 letters" : null;

//validation of gmail done
  export const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
    return emailRegex.test(value) ? null : "Invalid email. Only Gmail and Yahoo emails are allowed.";
  };
  

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
