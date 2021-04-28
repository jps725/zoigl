import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as beerActions from "../../store/beers";
import "./BeerForm.css";

const AddBeerForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [status, setStatus] = useState("");
  const [ibus, setIbus] = useState(0);
  const [abv, setAbv] = useState(0);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const updateStyle = (e) => setStyle(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);
  const updateIbus = (e) => setIbus(e.target.value);
  const updateAbv = (e) => setAbv(e.target.value);

  if (!userId) return alert("Must be signed in to do that");
  const reset = () => {
    setName("");
    setStyle("");
    setStatus("");
    setIbus(0);
    setAbv(0);
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const beer = { name, style, status, ibus, abv, userId, image };
    dispatch(beerActions.createBeer(beer)).catch(async (res) => {
      const beerData = await res.json();
      if (beerData && beerData.errors);
      setErrors(beerData.errors);
    });
    reset();
    onClose();
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="form__addBeer">
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
        <button type="submit">Add Beer</button>
      </form>
    </div>
  );
};

export default AddBeerForm;
