import { useSelector } from "react-redux";
import Beers from "../Beers";
// import { useHistory } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.session.user);
  // const history = useHistory();
  if (!user) return null;
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
