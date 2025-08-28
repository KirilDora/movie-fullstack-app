import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieList from "./MovieList";
import type { Movie } from "../../../shared/types";

jest.mock("../MovieCard/MovieCard", () => {
  return jest.fn(({ movie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  ));
});

/**
 * Suite of unit tests for the MovieList component.
 * We'll test how it behaves in different states: loading, error, empty, and with data.
 */
describe("MovieList", () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      runtime: "148 min",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      is_favorite: false,
      userId: 1,
    },
    {
      id: 2,
      title: "The Matrix",
      year: 1999,
      runtime: "136 min",
      genre: "Sci-Fi",
      director: "The Wachowskis",
      is_favorite: true,
      userId: 1,
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  /**
   * Test case 1: Component displays a loading state.
   * We check if the component renders the loading spinner when `isLoading` is true.
   */
  test("renders loading state when isLoading is true", () => {
    render(
      <MovieList
        movies={[]}
        isLoading={true}
        error={null}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );
    expect(screen.getByTestId("Spinner")).toBeInTheDocument();
  });

  /**
   * Test case 2: Component displays an error message.
   * We check if the component renders the error message when an `error` is provided.
   */
  test("renders error message when an error occurs", () => {
    const errorMessage = "Failed to fetch movies.";
    render(
      <MovieList
        movies={[]}
        isLoading={false}
        error={errorMessage}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  /**
   * Test case 3: Component displays an empty message.
   * We check if the component renders the empty message when the movies array is empty.
   */
  test("renders empty message when no movies are found", () => {
    render(
      <MovieList
        movies={[]}
        isLoading={false}
        error={null}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );
    expect(
      screen.getByText(
        /No movies found. Try adding a new movie or searching the OMDB database./i
      )
    ).toBeInTheDocument();
  });

  /**
   * Test case 4: Component renders a list of movies.
   * We check if the component correctly renders a list of movies by verifying
   * that each movie's title is present.
   */
  test("renders a list of movies when data is available", () => {
    render(
      <MovieList
        movies={mockMovies}
        isLoading={false}
        error={null}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(screen.getAllByTestId("movie-card")).toHaveLength(mockMovies.length);
  });
});
