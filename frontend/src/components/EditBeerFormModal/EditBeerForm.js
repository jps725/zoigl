import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as beerActions from "../../store/beers";
import "./EditBeerForm.css";

const EditBeerForm = ({ onClose, beer }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  //   const beer = useSelector((state) => state.beer)
  const [name, setName] = useState(beer.name);
  const [style, setStyle] = useState(beer.style);
  const [status, setStatus] = useState(beer.status);
  const [ibus, setIbus] = useState(beer.ibus);
  const [abv, setAbv] = useState(beer.abv);
  const [beerImageUrl, setBeerImageUrl] = useState(beer.beerImageUrl);
  const [errors, setErrors] = useState([]);
  const updateName = (e) => setName(e.target.value);
  const updateStyle = (e) => setStyle(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);
  const updateIbus = (e) => setIbus(e.target.value);
  const updateAbv = (e) => setAbv(e.target.value);

  // if (!userId) return alert("Must be signed in to do that");
  const id = beer.id;

  const payload = {
    name,
    style,
    status,
    ibus,
    abv,
    userId,
    beerImageUrl,
    id,
    //added userId - see if still works?
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(beerActions.updateBeer(payload)).catch(async (res) => {
      const beerData = await res.json();
      if (beerData && beerData.errors);
      setErrors(beerData.errors);
    });

    onClose();
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setBeerImageUrl(file);
  };

  return (
    <div className="form__editBeer">
      <h1>Update Beer</h1>

      {errors.length > 0 &&
        errors.map((error) => (
          <div className="errors" key={error}>
            {error}
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={id} />
        <label>
          <input
            type="text"
            placeholder="Beer Name"
            required
            value={name}
            onChange={updateName}
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
          %
        </label>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <button type="submit">Update Beer</button>
      </form>
    </div>
  );
};

export default EditBeerForm;
