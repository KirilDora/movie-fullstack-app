import React from "react";
import styled from "styled-components";
import { FaPlus, FaStar } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import type { MovieControlsProps } from "../../../shared/types";

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-bottom: 20px;
  gap: 1vw;
  flex-wrap: wrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background-color: #f0f2f5;
  color: #1ea0f8ff;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1.2rem;
  &:hover {
    transform: scale(1.05);
    background-color: #95a5a6;
  }
  &.active {
    background-color: #f1c40f;
    color: #333;
  }
  svg {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`;

interface FavoriteButtonProps {
  $active: boolean;
}

const FavoriteButton = styled(IconButton)<FavoriteButtonProps>`
  border: none;
  background-color: ${(props) => (props.$active ? "none" : "none")};
  color: ${(props) => (props.$active ? "#e67e22" : "#34495e")};
  &:hover {
    background-color: ${(props) => (props.$active ? "#none" : "#95a5a6")};
  }
`;

const MovieControls: React.FC<MovieControlsProps> = ({
  onSearch,
  onToggleFavorites,
  onAddMovie,
  isFavoritesFilterActive,
}) => {
  return (
    <ControlsSection>
      <SearchBar onSearch={onSearch} />
      <ActionButtons>
        <IconButton onClick={onAddMovie} title="Add movie">
          <FaPlus />
        </IconButton>
        <FavoriteButton
          $active={isFavoritesFilterActive}
          onClick={onToggleFavorites}
          title="Show favorite"
        >
          <FaStar />
        </FavoriteButton>
      </ActionButtons>
    </ControlsSection>
  );
};

export default MovieControls;
