import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as beerActions from "../../store/beers";

const AddBeerForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const [beerName, setBeerName] = useState("");
  const [style, setStyle] = useState("");
  const [status, setStatus] = useState("");
  const [ibus, setIbus] = useState(0);
  const [abv, setAbv] = useState(0);
  const [errors, setErrors] = useState([]);

  const updateBeerName = (e) => setBeerName(e.target.value);
  const updateStyle = (e) => setStyle(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);
  const updateIbus = (e) => setIbus(e.target.value);
  const updateAbv = (e) => setAbv(e.target.value);
  if (!userId) return alert("Must be signed in to do that");
  const reset = () => {
    setBeerName("");
    setStyle("");
    setStatus("");
    setIbus(0);
    setAbv(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    dispatch(
      beerActions.createBeer({
        beerName,
        style,
        status,
        ibus,
        abv,
        userId,
      })
    )
      .then(reset())
      .catch(async (res) => {
        const beerData = await res.json();
        if (beerData && beerData.errors);
        setErrors(errors);
      });
  };

  return (
    <div>
      <h1>Add New Beer</h1>

      {errors.length > 0 &&
        errors.map((error) => (
          <div className="errors" key={error}>
            {error}
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Beer Name"
            required
            value={beerName}
            onChange={updateBeerName}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Style"
            required
            value={style}
            onChange={updateStyle}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Status"
            required
            value={status}
            onChange={updateStatus}
          />
        </label>
        <label>
          IBUs
          <input
            type="number"
            placeholder="IBUs"
            required
            value={ibus}
            onChange={updateIbus}
          />
        </label>
        <label>
          ABV
          <input
            type="number"
            placeholder="ABV"
            required
            value={abv}
            onChange={updateAbv}
          />
        </label>
        <button type="submit">Add Beer</button>
      </form>
    </div>
  );
};

export default AddBeerForm;
