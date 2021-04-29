import "./index.css";
import EditReviewForm from "./EditReviewForm";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";

function EditReviewFormModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Edit Review</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <EditReviewForm onClose={handleCloseModal} review={review} />
        </Modal>
      )}
    </div>
  );
}

export default EditReviewFormModal;
