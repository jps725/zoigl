import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as beerActions from "../../store/beers";

export default function SingleBeer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    console.log("useeffect dispatch", id);
    dispatch(beerActions.getOneBeer(id));
  }, [dispatch, id]);

  return (
    <div className="singleBeer__container">
      <div>{}</div>
    </div>
  );
}
