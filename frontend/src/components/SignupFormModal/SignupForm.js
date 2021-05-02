import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [breweryName, setBreweryName] = useState("");

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const updateBreweryName = (e) => setBreweryName(e.target.value);

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);
    setBreweryName("");
    history.push("/profile");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors(["Passwords must match"]);
    }
    let errors = [];
    dispatch(
      sessionActions.signupUser({
        username,
        email,
        password,
        image,
        breweryName,
      })
    )
      .then(reset())
      .catch(async (res) => {
        const userData = await res.json();
        if (userData && userData.errors) {
          errors = userData.errors;
          setErrors(errors);
        }
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="form__div">
      <h1>Sign Up</h1>

      {errors.length > 0 &&
        errors.map((error) => (
          <div className="errors" key={error}>
            {error}
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={updateUsername}
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={updateEmail}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Brewery Name"
            value={breweryName}
            onChange={updateBreweryName}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={updatePassword}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={updateConfirmPassword}
          />
        </label>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
