import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneBeer } from "../../store/beers";

export default function BeerCard({ beerId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneBeer(beerId));
  }, [dispatch, beerId]);

  const beer = useSelector ((state) => state.beers[beerId])

  if(!beer){
      return null;
  }

  return(
      <div
  )
}
