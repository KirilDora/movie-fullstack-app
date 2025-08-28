import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { UserPromptModalProps } from "../../../shared/types";

interface FormInputs {
  username: string;
}

const UserPromptModal: React.FC<UserPromptModalProps> = ({
  isOpen,
  onClose,
  onUsernameSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onUsernameSubmit(data.username);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
      <h2>Welcome!</h2>
      <p>Please, enter username to continue:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            placeholder="Username"
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Sign In
        </button>
      </form>
    </Modal>
  );
};

export default UserPromptModal;
