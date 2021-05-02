import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
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
    history.push("/splash");
  };

  return (
    <div id="beerGlassLink">
      <button className="button__profile" onClick={openMenu}>
        <i className="fas fa-beer" />
      </button>
      {showMenu && (
        <div className="menu__profile--dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <img
            className="profile__img"
            alt="profile"
            src={user.profileImageUrl}
          />

          <button className="logout__button" onClick={handleLogout}>
            Log Out
          </button>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
