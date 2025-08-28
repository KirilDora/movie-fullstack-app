import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  grid-column: 1 / -1;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #e74c3c;
  grid-column: 1 / -1;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  grid-column: 1 / -1;
`;

export const Spinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 3rem;
  color: #3498db;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
