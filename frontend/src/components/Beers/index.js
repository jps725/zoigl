import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBeers } from "../../store/beers";
import AddBeerFormModal from "../AddBeerFormModal";
import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";
import "./index.css";

export default function Beers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeers());
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
        <button value={beer.id} onClick={handleDelete}>
          Delete
        </button>
        <div>
          <div>{beer.style}</div>
          <div>{beer.status}</div>
          <div>{beer.ibus}</div>
          <div>{beer.abv}%</div>
          <img
            className="beerLogo__img"
            alt="beer logo"
            src={beer.beerImageUrl}
          />
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
