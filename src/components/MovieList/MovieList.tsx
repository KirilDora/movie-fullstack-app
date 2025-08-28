import React from "react";
import type { Movie, MovieListProps } from "../../../shared/types";
import MovieCard from "../MovieCard/MovieCard";
import {
  EmptyMessage,
  ErrorMessage,
  ListContainer,
  LoadingContainer,
  Spinner,
} from "./MovieList.style";

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  error,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (!movies || movies.length === 0) {
    return (
      <EmptyMessage>
        No movies found. Try adding a new movie or searching the OMDB database.
      </EmptyMessage>
    );
  }

  return (
    <ListContainer>
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ListContainer>
  );
};

export default MovieList;
