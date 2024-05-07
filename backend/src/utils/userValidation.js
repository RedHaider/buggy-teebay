export const validateFirstName = (value) => {
  if (value.length === 0) {
    return "First name is required";
  }
  if (value.length < 2) {
    return "First name must have at least 2 characters";
  }
  if (value.length > 200) {
    return "First name must not exceed 200 characters";
  }
  return null;
};

export const validateLastName = (value) => {
  if (value.length < 2) {
    return "Last name must have at least 2 characters";
  }
  if (value.length > 200) {
    return "Last name must not exceed 200 characters";
  }
  return null;
};

export const validateEmail = (value) => {
  if (!/^\S+@\S+$/.test(value)) {
    return "Invalid email address";
  }
  if (value.length > 200) {
    return "Email must not exceed 200 characters";
  }
  return null;
};

export const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password must have at least 8 characters";
  }
  if (value.length > 200) {
    return "Password must not exceed 200 characters";
  }
  return null;
};
