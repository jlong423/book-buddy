import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const firstName = formData.get("first name");
    const lastName = formData.get("last name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ email, password });
      navigate("/books");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register for an account</h2>
        <form action={tryRegister}>
          <label>
            First Name
            <input type="text" name="first name" />
          </label>
          <label>
            Last Name
            <input type="text" name="last name" />
          </label>
          <label>
            Email
            <input type="text" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button>Register</button>
          {error && <p role="alert">{error}</p>}
        </form>
        <br />
        <Link to="/login">Already have an account? Log in here</Link>
      </div>
    </>
  );
}
