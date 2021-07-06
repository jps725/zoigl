import { NavLink, useHistory } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFromModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const handleDemo = (e) => {
    e.preventDefault();
    let credential = "Demo";
    let password = "password";
    dispatch(sessionActions.login({ credential, password }));
    history.push("/profile");
  };

  let sessionLinks;
  let homeLink;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
    homeLink = (
      <NavLink className="navLink" id="homeLink" to="/profile">
        Home
      </NavLink>
    );
  } else {
    sessionLinks = (
      <div className="form__buttons">
        <LoginFormModal />
        <SignupFormModal />
        <button onClick={handleDemo}>Demo</button>
      </div>
    );
    homeLink = (
      <NavLink className="navLink" id="homeLink" to="/">
        Home
      </NavLink>
    );
  }

  return (
    <nav>
      <menu>
        {homeLink}
        <NavLink className="navLink" id="beerLink" to="/beers">
          Beers
        </NavLink>
        <NavLink className="navLink" id="reviewsLink" to="/reviews">
          Reviews
        </NavLink>
        <div className="logo__nav" id="navLogo">
          zoigl
        </div>
        {isLoaded && sessionLinks}
      </menu>
    </nav>
  );
}

export default Navigation;
