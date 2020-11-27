import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalButton(props) {
  const {
    title,
    modalState,
    setModal,
    btnClassName,
    btnStyle,
    modalSize,
    modalAria,
    children,
  } = props;

  return (
    <>
      <button
        className={btnClassName}
        style={btnStyle}
        onClick={() => setModal(true)}
      >
        {title}
      </button>
      <Modal
        size={modalSize}
        aria-labelledby={modalAria}
        centered
        show={modalState}
        onHide={() => setModal(false)}
      >
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

ModalButton.defaultProps = {
  modalAria: "contained-modal-title-vcenter",
};
