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

export const validatePassword = (value) =>
  value.length < 8 ? "Password must have at least 8 characters" : null;

export const validateConfirmPassword = (value, values) =>
  value !== values.password ? "Passwords did not match" : null;
