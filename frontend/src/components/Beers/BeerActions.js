import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";
import AddReviewFormModal from "../AddReviewFormModal";
function BeerActionMenu({ beer, idx }) {
  const dispatch = useDispatch();
  const [showBeerMenu, setShowBeerMenu] = useState(false);

  const openMenu = () => {
    if (showBeerMenu) {
      setShowBeerMenu(false);
    }
    setShowBeerMenu(true);
  };

  // useEffect(() => {
  //   if (!showBeerMenu) return;
  //   const closeMenu = () => {
  //     setShowBeerMenu(false);
  //   };
  //   document.addEventListener("click", closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showBeerMenu]);

  const handleDelete = (e) => {
    dispatch(beerActions.deleteBeer(e.target.value));
  };

  return (
    <div>
      <button className="beerActions__menu--button" onClick={openMenu}>
        <i className="fas fa-ellipsis-v" />
      </button>
      {showBeerMenu && (
        <div className="beerActions__menu--dropdown">
          <EditBeerFormModal beer={beer} idx={idx} />
          <AddReviewFormModal beer={beer} idx={idx} />
          <button value={idx} onClick={handleDelete}>
            Delete Beer
          </button>
        </div>
      )}
    </div>
  );
}

export default BeerActionMenu;
