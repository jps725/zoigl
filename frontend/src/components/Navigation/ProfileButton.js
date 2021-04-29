import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };

  return (
    <div>
      <button className="button__profile" onClick={openMenu}>
        <i className="fas fa-beer" />
      </button>
      {showMenu && (
        <div className="menu__profile--dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          {/* <img
            className="profile__img"
            alt="profile"
            src={user.profileImageUrl}
          />
           */}
          <div>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
