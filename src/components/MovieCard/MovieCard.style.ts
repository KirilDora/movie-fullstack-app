import styled from "styled-components";

export const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardContent = styled.div`
  padding: 15px;
  flex-grow: 1;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDetails = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid #eee;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #34495e;
  font-size: 1rem;
  transition: color 0.3s, transform 0.2s;
  &:hover {
    color: #2c3e50;
    transform: scale(1.1);
  }
`;

interface FavoriteButtonProps {
  $isFavorite: boolean;
}

export const FavoriteButton = styled(ActionButton)<FavoriteButtonProps>`
  color: ${(props) => (props.$isFavorite ? "#f1c40f" : "#bdc3c7")};
  &:hover {
    color: ${(props) => (props.$isFavorite ? "#f39c12" : "#95a5a6")};
  }
`;
