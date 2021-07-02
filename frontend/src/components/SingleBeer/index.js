import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as beerActions from "../../store/beers";

export default function SingleBeer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //   useEffect(() => {
  //     dispatch(beerActions.getOneBeer(id));
  //   }, [dispatch]);
}
