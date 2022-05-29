import { useEffect, useState } from "react";

const Modal = ({ closeModal, content, show }) => {
  // State.
  const [body, setBody] = useState();
  const [visible, setVisible] = useState();

  // Handle close.
  const handleClose = () => {
    // Close modal.
    closeModal();
  };

  // Hook on content.
  useEffect(() => {
    // Set body.
    setBody(content);
  }, [content]);

  // Hook on show.
  useEffect(() => {
    // If show.
    if (show) {
      // Set visible.
      setVisible(true);
    } else {
      // Set visible.
      setVisible(false);
    }
  }, [show]);

  return visible ? (
    <div className="Modal">
      <button onClick={handleClose}>Close</button>
      <div className="ModalBody">{show && body}</div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
