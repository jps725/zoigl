import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const userData = await res.json();
        if (userData && userData.errors) setErrors(userData.errors);
      }
    );
    history.push("/profile");
  };
  return (
    <section className="form__div">
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
          placeholder="username or email"
          required
          value={credential}
          onChange={updateCredential}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Log In</button>
      </form>
    </section>
  );
}

export default LoginForm;
