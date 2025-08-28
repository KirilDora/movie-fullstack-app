import styled from "styled-components";

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 0 auto;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 25px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s;
`;

export const ConfirmButton = styled(StyledButton)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

export const CancelButton = styled(StyledButton)`
  background-color: #95a5a6;
  color: white;

  &:hover {
    background-color: #7f8c8d;
    transform: translateY(-2px);
  }
`;
