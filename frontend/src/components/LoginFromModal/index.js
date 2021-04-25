import LoginForm from "./LoginForm";
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "./index.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Log In</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
