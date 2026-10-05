import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import InputField from "./InputField";
import { validateLogin } from "../validation";
import { loginUser } from "../auth";


function Login({ onLogin }) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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

    const validationErrors = validateLogin(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {

      const user = loginUser(
        form.email,
        form.password
      );

      onLogin(user);

      navigate("/dashboard");

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

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Access your developer workspace
        </p>

        {serverError && (
          <div className="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

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
            placeholder="Enter password"
          />

          <button className="primary-btn">
            Login
          </button>

        </form>

        <p className="switch">
          Don't have an account?
          {" "}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;