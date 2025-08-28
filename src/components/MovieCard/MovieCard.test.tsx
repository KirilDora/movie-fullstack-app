import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "./MovieCard";
import type { Movie } from "../../../shared/types";

/**
 * Suite of unit tests for the MovieCard component.
 * We'll check if the component renders correctly and handles user interactions.
 */
describe("MovieCard", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Inception",
    year: 2010,
    runtime: "148 min",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    is_favorite: false,
    userId: 1,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  /**
   * Test case 1: Component renders with all movie details.
   * We verify that all the movie information is correctly displayed on the card.
   */
  test("renders correctly with movie details", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/Year: 2010/i)).toBeInTheDocument();
    expect(screen.getByText(/Runtime: 148 min/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre: Sci-Fi/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Director: Christopher Nolan/i)
    ).toBeInTheDocument();
  });

  /**
   * Test case 2: 'Edit' button click event.
   * We simulate a click on the 'Edit' button and check if the corresponding
   * mock function `mockOnEdit` is called with the correct movie object.
   */
  test("calls onEdit on 'Edit' button click", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    // Find the 'Edit' button by its title.
    const editButton = screen.getByTitle("Edit");
    // Simulate a click event on the button.
    fireEvent.click(editButton);

    // Expect that the mock function was called exactly once with the mock movie object.
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockMovie);
  });

  /**
   * Test case 3: 'Delete' button click event.
   * We simulate a click on the 'Delete' button and check if the corresponding
   * mock function `mockOnDelete` is called with the correct movie ID.
   */
  test("calls onDelete on 'Delete' button click", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    // Find the 'Delete' button by its title.
    const deleteButton = screen.getByTitle("Delete");
    // Simulate a click event on the button.
    fireEvent.click(deleteButton);

    // Expect that the mock function was called exactly once with the mock movie ID.
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockMovie.id);
  });

  /**
   * Test case 4: 'Favorite' button click event.
   * We simulate a click on the 'Favorite' button and check if the `onToggleFavorite`
   * function is called with the correct movie object.
   */
  test("calls onToggleFavorite on 'Favorite' button click", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTitle("Favorite toggler");
    fireEvent.click(favoriteButton);

    // Expect that the mock function was called exactly once with the mock movie object.
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockMovie);
  });

  /**
   * Test case 5: 'Favorite' button styling based on prop.
   * We check if the button has the correct active/inactive styling based on the `is_favorite` prop.
   */
  test("favorite button is styled correctly when is_favorite is true", () => {
    const favoriteMovie = { ...mockMovie, is_favorite: true };
    render(
      <MovieCard
        movie={favoriteMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTitle("Favorite toggler");
    expect(favoriteButton).toHaveStyle("color: #f1c40f");
  });

  test("favorite button is styled correctly when is_favorite is false", () => {
    render(
      <MovieCard
        movie={mockMovie} // Using the default mock movie, which is not a favorite.
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTitle("Favorite toggler");
    // We expect the button to have a specific inactive color.
    expect(favoriteButton).toHaveStyle("color: #95a5a6");
  });
});
