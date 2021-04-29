import { useSelector } from "react-redux";
import Beers from "../Beers";

export default function Profile() {
  const user = useSelector((state) => state.session.user);

  if (!user) return null;
  if (!user.profileImageUrl) {
    user.profileImageUrl = "../../images/default-profile-picture.png";
  }
  return (
    <div>
      <div className="profile__info">
        <h1>Welcome {user.username}</h1>
        <img src={user.profileImageUrl} alt="profile" />
        <div>Brewery: {user.breweryName}</div>
      </div>
      <Beers />
    </div>
  );
}
