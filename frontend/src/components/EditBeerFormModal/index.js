import EditBeerForm from "./EditBeerForm";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";

function EditBeerFormModal({ beer }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Update Beer</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <EditBeerForm onClose={handleCloseModal} beer={beer} />
        </Modal>
      )}
    </div>
  );
}

export default EditBeerFormModal;
