import "./index.css";
import AddReviewForm from "./AddReviewForm";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";

function AddReviewFormModal({ beer }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Add a Review</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <AddReviewForm onClose={handleCloseModal} beer={beer} />
        </Modal>
      )}
    </div>
  );
}

export default AddReviewFormModal;
