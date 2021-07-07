import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getBeers } from "../../store/beers";
import AddBeerFormModal from "../AddBeerFormModal";
// import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";
// import AddReviewFormModal from "../AddReviewFormModal";
import BeerActionMenu from "./BeerActions";
import { NavLink } from "react-router-dom";

export default function Beers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beerActions.getBeers());
  }, [dispatch]);

  const avgRating = (beer) => {
    let sum = 0;
    let numRevs = beer.Reviews.length;

    beer.Reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / numRevs;
  };

  // const handleDelete = (e) => {
  //   dispatch(beerActions.deleteBeer(e.target.value));
  // };
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

          {/* <EditBeerFormModal beer={beer} />
        <AddReviewFormModal beer={beer} />
        <button value={beer.id} onClick={handleDelete}>
        Delete Beer
      </button> */}
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
            {/* <div className="reviews__container">
            {beer.Reviews?.map((review) => (
              <div key={review.id} className="review__div">
              <div>Review: {review.review} </div>
              <div>Rating: {review.rating}</div>
              <div>By User: {review.User.username}</div>
              <img
              className="profile__img--review"
              src={review.User.profileImageUrl}
              alt="profile"
              />
              </div>
              ))}
            </div> */}
          </div>
        </NavLink>
      </div>
    ));
  });

  return (
    <div className="allBeer__container">
      <h1>Recent Beers</h1>
      <AddBeerFormModal />
      <div className="beer__list__container">{beers}</div>
    </div>
  );
}
