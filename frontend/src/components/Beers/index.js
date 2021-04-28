import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBeers } from "../../store/beers";
import AddBeerFormModal from "../AddBeerFormModal";
import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";

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
          <div>{beer.beerImageUrl}</div>
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
