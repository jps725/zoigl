import AddBeerForm from "./AddBeerForm.js";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";

function AddBeerFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Add a Beer</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <AddBeerForm />
        </Modal>
      )}
    </div>
  );
}

export default AddBeerFormModal;
