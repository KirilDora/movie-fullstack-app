import React from "react";
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import type { MovieCardProps } from "../../../shared/types";
import {
  ActionButton,
  CardActions,
  CardContainer,
  CardContent,
  CardDetails,
  CardTitle,
  FavoriteButton,
} from "./MovieCard.style";

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <CardContainer>
      <CardContent>
        <CardTitle>{movie.title}</CardTitle>
        <CardDetails>
          Year: {movie.year} <br />
          Runtime: {movie.runtime} <br />
          Genre: {movie.genre} <br />
          Director: {movie.director}
        </CardDetails>
      </CardContent>

      <CardActions>
        <FavoriteButton
          $isFavorite={movie.is_favorite}
          onClick={() => onToggleFavorite(movie)}
          title="Favorite toggler"
        >
          <FaStar />
        </FavoriteButton>
        <ActionButton onClick={() => onEdit(movie)} title="Edit">
          <FaEdit />
        </ActionButton>
        <ActionButton onClick={() => onDelete(movie.id)} title="Delete">
          <FaTrashAlt />
        </ActionButton>
      </CardActions>
    </CardContainer>
  );
};

export default MovieCard;
