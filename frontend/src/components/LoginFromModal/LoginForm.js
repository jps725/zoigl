import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  //   const history = useHistory();
  //   const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  //   if (sessionUser) {
  //     return <Redirect to="/" />;
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const userData = await res.json();
        if (userData && userData.errors) setErrors(userData.errors);
      }
    );
  };
  return (
    <section className="form__login">
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
