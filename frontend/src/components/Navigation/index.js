import "./Navigation.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFromModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="form__buttons">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <nav>
      <menu>
        <NavLink className="navLink" to="/splash">
          Home
        </NavLink>
        <NavLink className="navLink" to="/beers">
          Beers
        </NavLink>
        <NavLink className="navLink" to="/reviews">
          Reviews
        </NavLink>
        <NavLink className="navLink" to="/about">
          About
        </NavLink>
        {isLoaded && sessionLinks}
      </menu>
    </nav>
  );
}

export default Navigation;
