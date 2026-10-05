export function validateRegister(form) {

  const errors = {};

  if (!form.username.trim()) {
    errors.username = "Username is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}


export function validateLogin(form) {

  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
}