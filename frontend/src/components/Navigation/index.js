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
      <div>
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
