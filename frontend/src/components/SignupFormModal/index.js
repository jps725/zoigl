import SignupForm from "./SignupForm";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Sign Up</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <SignupForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
