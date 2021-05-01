import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFromModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  let homeLink;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
    homeLink = (
      <NavLink className="navLink" to="/profile">
        Home
      </NavLink>
    );
  } else {
    sessionLinks = (
      <div className="form__buttons">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
    homeLink = (
      <NavLink className="navLink" to="/splash">
        Home
      </NavLink>
    );
  }

  return (
    <nav>
      <menu>
        {homeLink}
        <NavLink className="navLink" to="/beers">
          Beers
        </NavLink>
        <NavLink className="navLink" to="/reviews">
          Reviews
        </NavLink>
        <div className="logo__nav">zoigl</div>
        {isLoaded && sessionLinks}
      </menu>
    </nav>
  );
}

export default Navigation;
