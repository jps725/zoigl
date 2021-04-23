import "./SignupForm.css";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";

function SignupForm() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signupUser({ username, email, password })).catch(
        async (res) => {
          const userData = await res.json();
          if (userData && userData.errors) setErrors(userData.errors);
        }
      );
    }
    return setErrors(["Passwords must match"]);
  };

  return (
    <section className="form__signup">
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error) => (
            <div className="errors" key={error}>
              {error}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={updateUsername}
        />
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={updatePassword}
        />
        <input
          type="password"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={updateConfirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}

export default SignupForm;
