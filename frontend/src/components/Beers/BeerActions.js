import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditBeerFormModal from "../EditBeerFormModal";
import * as beerActions from "../../store/beers";
import AddReviewFormModal from "../AddReviewFormModal";
import { useHistory } from "react-router-dom";
function BeerActionMenu({ beer, idx }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id;
    }
    return null;
  });

  // useEffect(() => {
  //   if (!showBeerMenu) return;
  //   const closeMenu = () => {
  //     setShowBeerMenu(false);
  //   };
  //   document.addEventListener("click", closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showBeerMenu]);
  const handleDelete = (e) => {
    dispatch(beerActions.deleteBeer(e.target.value, idx));
    dispatch(beerActions.getUserBeers(userId));
    history.push("/profile");
  };
  let actions;
  if (userId === beer.userId) {
    actions = (
      <>
        <EditBeerFormModal beer={beer} idx={idx} />
        <button value={beer.id} idx={idx} onClick={handleDelete}>
          Delete Beer
        </button>
      </>
    );
  }

  return (
    <div>
      {/* <button className="beerActions__menu--button" onClick={openMenu}>
        <i className="fas fa-ellipsis-v" />
      </button> */}
      {/* {showBeerMenu && ( */}
      <div className="beerActions__menu--dropdown">
        <AddReviewFormModal beer={beer} idx={idx} />
        {actions}
      </div>
      {/* )} */}
    </div>
  );
}

export default BeerActionMenu;
