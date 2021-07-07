import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneBeer } from "../../store/beers";
import { useParams } from "react-router";
import BeerActionMenu from "../Beers/BeerActions";

export default function BeerCard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const beerId = Number(id);

  useEffect(() => {
    dispatch(getOneBeer(beerId));
  }, [dispatch, beerId]);

  const beer = useSelector((state) => state.beer[0]);

  const userId = useSelector((state) => state.session.user.id);

  const avgRating = (beer) => {
    let sum = 0;
    let numRevs = beer.Reviews.length;

    beer.Reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / numRevs;
  };
  if (!beer) {
    return null;
  }

  return (
    <div className="beerCard">
      <h2>{beer.name}</h2>
      <h3>
        avg rating {avgRating(beer) ? avgRating(beer) : "-- No Rating Yet --"}
      </h3>
      <BeerActionMenu userId={userId} beer={beer} />
      {/* <EditBeerFormModal beer={beer} />
        <AddReviewFormModal beer={beer} />
        <button value={beer.id} onClick={handleDelete}>
        Delete Beer
      </button> */}
      <img className="beerLogo__img" alt="beer logo" src={beer.beerImageUrl} />
      <div className="beerCard__stats">
        <div>Brewery: {beer.User.breweryName}</div>
        <div>Style: {beer.style}</div>
        <div>Status: {beer.status}</div>
        <div>IBUs: {beer.ibus}</div>
        <div>ABV: {beer.abv}%</div>
        <div>
          Description:
          <br></br>
          {beer.description}
        </div>
        <div className="reviews__container">
          {beer.Reviews?.map((review) => (
            <div key={review.id} className="review__div">
              <div>
                Review:
                <br></br>
                {review.review}{" "}
              </div>
              <div>Rating: {review.rating}</div>
              <div>
                <span>By User: {review.User.username}</span>
                <img
                  className="profile__img--review"
                  src={review.User.profileImageUrl}
                  alt="profile"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
