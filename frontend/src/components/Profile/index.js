import { useSelector } from "react-redux";
import Beers from "../Beers";

export default function Profile() {
  const user = useSelector((state) => state.session.user);

  if (!user) return null;

  return (
    <div className="profile__container">
      <div className="profile__info">
        <h1>Welcome {user.username}</h1>
        <img
          src={user.profileImageUrl}
          alt="profile"
          className="profile__img"
        />
        <div>{user.breweryName}</div>
      </div>
      <div className="profile__display-container">
        <div className="profile__beers-div">
          <Beers />
        </div>
      </div>
    </div>
  );
}
