import React from "react";
import Modal from "react-modal";
import type { ConfirmationModalProps } from "../../../shared/types";
import {
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  Message,
  ModalContent,
} from "./ConfirmationModal.style";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        },
      }}
    >
      <ModalContent>
        <h2>Approvement</h2>
        <Message>{message}</Message>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm} style={{ marginRight: "10px" }}>
            Delete
          </ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
