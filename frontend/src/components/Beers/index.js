import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBeers } from "../../store/beers";
import AddBeerFormModal from "../AddBeerForm";

export default function Beers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeers());
  }, [dispatch]);

  const beers = useSelector((state) => {
    return state.beer.beers?.map((beer) => (
      <div key={beer.id}>
        <h2>{beer.name}</h2>
        <div>
          <div>{beer.style}</div>
          <div>{beer.status}</div>
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
