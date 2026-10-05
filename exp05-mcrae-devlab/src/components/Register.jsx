import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "./InputField";
import { validateRegister } from "../validation";
import { registerUser } from "../auth";


function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });

    setServerError("");
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validateRegister(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {

      registerUser(form);

      navigate("/login");

    } catch (error) {

      setServerError(error.message);

    }
  };


  return (
    <div className="page">

      <div className="auth-card">

        <div className="logo">
          M
        </div>

        <h1>Create Account</h1>

        <p className="subtitle">
          Join McRae DevLab
        </p>

        {serverError && (
          <div className="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Enter username"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Minimum 8 characters"
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Re-enter password"
          />

          <button className="primary-btn">
            Create Account
          </button>

        </form>

        <p className="switch">
          Already have an account?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;