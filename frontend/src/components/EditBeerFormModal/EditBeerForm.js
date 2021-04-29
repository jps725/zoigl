import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as beerActions from "../../store/beers";
import "./EditBeerForm.css";

const EditBeerForm = ({ onClose, beer }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const [name, setName] = useState(beer.name);
  const [style, setStyle] = useState(beer.style);
  const [status, setStatus] = useState(beer.status);
  const [ibus, setIbus] = useState(beer.ibus);
  const [abv, setAbv] = useState(beer.abv);
  const [image, setImage] = useState(beer.beerImageUrl);
  const [errors, setErrors] = useState([]);
  const updateName = (e) => setName(e.target.value);
  const updateStyle = (e) => setStyle(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);
  const updateIbus = (e) => setIbus(e.target.value);
  const updateAbv = (e) => setAbv(e.target.value);

  const id = beer.id;

  const reset = () => {
    setName("");
    setStyle("");
    setStatus("");
    setIbus(0);
    setAbv(0);
    setImage(null);
    setErrors({});
  };

  useEffect(() => {
    let errors = {};
    if (name.length < 3) {
      errors.name = "Name must be more than 3 characters.";
    } else if (name.length > 50) {
      errors.name = "Name must be less than 50 characters.";
    }
    if (!style) {
      errors.style = "Please select a style.";
    }
    if (!status) {
      errors.status = "Please select a status.";
    }
    if (abv < 0) {
      errors.abv = "ABV must be greater than 0%.";
    } else if (abv > 30) {
      errors.abv = "ABV must be below 30%.";
    }
    if (ibus < 0) {
      errors.ibus = "IBUs must be greater than 0.";
    } else if (ibus > 200) {
      errors.ibus = "IBUs must be less than 200.";
    }
    setErrors(errors);
  }, [name, style, status, abv, ibus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.length) {
      const payload = {
        name,
        style,
        status,
        ibus,
        abv,
        userId,
        image,
        id,
      };
      dispatch(beerActions.updateBeer(payload)).catch(async (res) => {
        await res.json();
      });
      reset();
      onClose();
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="form__editBeer">
      <h1>Update Beer</h1>
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
        {errors.name && <div className="errors">{errors.name}</div>}
        <label>
          <input
            type="text"
            placeholder="Style"
            required
            value={style}
            onChange={updateStyle}
          />
        </label>
        {errors.style && <div className="errors">{errors.style}</div>}
        <label>
          <input
            type="text"
            placeholder="Status"
            required
            value={status}
            onChange={updateStatus}
          />
        </label>
        {errors.status && <div className="errors">{errors.status}</div>}
        <label>
          IBUs:
          <input
            type="number"
            placeholder="IBUs"
            required
            value={ibus}
            onChange={updateIbus}
          />
        </label>
        {errors.ibus && <div className="errors">{errors.ibus}</div>}
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
        {errors.abv && <div className="errors">{errors.abv}</div>}
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <button type="submit" disabled={Object.keys(errors).length}>
          Update Beer
        </button>
      </form>
    </div>
  );
};

export default EditBeerForm;
