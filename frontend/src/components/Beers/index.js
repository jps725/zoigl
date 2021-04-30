import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getBeers } from "../../store/beers";
import AddBeerFormModal from "../AddBeerFormModal";
import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";
import AddReviewFormModal from "../AddReviewFormModal";
import "./index.css";

export default function Beers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beerActions.getBeers());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(beerActions.deleteBeer(e.target.value));
  };

  const beers = useSelector((state) => {
    const beerList = Object.values(state.beer);
    return beerList?.map((beer) => (
      <div key={beer.id}>
        <h2>{beer.name}</h2>
        <EditBeerFormModal beer={beer} />
        <AddReviewFormModal beer={beer} />
        <button value={beer.id} onClick={handleDelete}>
          Delete Beer
        </button>
        <div>
          <div>Brewery: {beer.User.breweryName}</div>
          <div>Style: {beer.style}</div>
          <div>Status: {beer.status}</div>
          <div>IBUs: {beer.ibus}</div>
          <div>ABV: {beer.abv}%</div>
          <img
            className="beerLogo__img"
            alt="beer logo"
            src={beer.beerImageUrl}
          />
          {beer.Reviews?.map((review) => (
            <div key={review.id}>
              <div>{review.review} </div>
              <div>{review.rating} </div>
            </div>
          ))}
        </div>
      </div>
    ));
  });

  return (
    <div>
      <h1>Beers</h1>
      <AddBeerFormModal />
      {beers}
    </div>
  );
}
