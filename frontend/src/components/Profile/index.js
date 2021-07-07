import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as beerActions from "../../store/beers";
import AddBeerFormModal from "../AddBeerFormModal";
import Beers from "../Beers";

export default function Profile() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beerActions.getUserBeers(user.id));
  }, [dispatch, user.id]);

  const avgRating = (beer) => {
    let sum = 0;
    let numRevs = beer.Reviews.length;

    beer.Reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / numRevs;
  };

  const beers = useSelector((state) => {
    // const beerList = Object.values(state.beer);
    return state.beer?.map((beer, idx) => (
      <div key={beer.id} className="beer__div--display" value={idx}>
        <NavLink to={`/beers/${beer.id}`} className="beer__navLink">
          <h2>{beer.name}</h2>
          <h3>
            avg rating{" "}
            {avgRating(beer) ? avgRating(beer) : "-- No Rating Yet --"}
          </h3>

          <img
            className="beerLogo__img"
            alt="beer logo"
            src={beer.beerImageUrl}
          />
          <div>
            <div>Brewery: {beer.User.breweryName}</div>
            <div>Style: {beer.style}</div>
            <div>Status: {beer.status}</div>
            <div>IBUs: {beer.ibus}</div>
            <div>ABV: {beer.abv}%</div>
          </div>
        </NavLink>
      </div>
    ));
  });

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
          <h1>My Beers</h1>
          <div className="profile__addButton">
            <AddBeerFormModal />
          </div>
          <div className="beer__list__container">{beers}</div>
        </div>
      </div>
    </div>
  );
}
