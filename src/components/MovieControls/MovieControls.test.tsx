import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieControls from "./MovieControls";

/**
 * Suite of unit tests for the MovieControls component.
 * We'll check if the component renders correctly and handles user interactions.
 */
describe("MovieControls", () => {
  const mockOnSearch = jest.fn();
  const mockOnAddMovie = jest.fn();
  const mockOnToggleFavorites = jest.fn();

  /**
   * Test case 1: Component renders with all elements.
   * We verify that the search bar and both action buttons are present in the document.
   */
  test("renders correctly with search bar and buttons", () => {
    render(
      <MovieControls
        searchQuery=""
        isFavoritesFilterActive={false}
        onSearch={mockOnSearch}
        onAddMovie={mockOnAddMovie}
        onToggleFavorites={mockOnToggleFavorites}
      />
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    const addMovieButton = screen.getByTitle("Add movie");
    expect(addMovieButton).toBeInTheDocument();

    const showFavoritesButton = screen.getByTitle("Show favorite");
    expect(showFavoritesButton).toBeInTheDocument();
  });

  /**
   * Test case 2: 'Add Movie' button click event.
   * We simulate a click on the 'Add Movie' button and check if the corresponding
   * mock function `mockOnAddMovie` is called.
   */
  test("calls onAddMovie on 'Add Movie' button click", () => {
    render(
      <MovieControls
        searchQuery=""
        isFavoritesFilterActive={false}
        onSearch={mockOnSearch}
        onAddMovie={mockOnAddMovie}
        onToggleFavorites={mockOnToggleFavorites}
      />
    );

    const addMovieButton = screen.getByTitle("Add movie");
    fireEvent.click(addMovieButton);

    expect(mockOnAddMovie).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case 3: 'Show Favorites' button click event.
   * We simulate a click on the 'Show Favorites' button and check if the corresponding
   * mock function `mockOnToggleFavorites` is called.
   */
  test("calls onToggleFavorites on 'Show Favorites' button click", () => {
    render(
      <MovieControls
        searchQuery=""
        isFavoritesFilterActive={false}
        onSearch={mockOnSearch}
        onAddMovie={mockOnAddMovie}
        onToggleFavorites={mockOnToggleFavorites}
      />
    );

    const showFavoritesButton = screen.getByTitle("Show favorite");
    fireEvent.click(showFavoritesButton);

    expect(mockOnToggleFavorites).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case 4: 'Show Favorites' button styling changes based on prop.
   * We check if the button has the correct active/inactive styling based on the
   * `isFavoritesFilterActive` prop.
   * NOTE: We are testing for the presence of a class that would indicate active state.
   * The actual styling depends on how styled-components applies the prop.
   */
  test("favorite button is active when isFavoritesFilterActive is true", () => {
    const { getByTitle } = render(
      <MovieControls
        searchQuery=""
        isFavoritesFilterActive={true}
        onSearch={mockOnSearch}
        onAddMovie={mockOnAddMovie}
        onToggleFavorites={mockOnToggleFavorites}
      />
    );

    const favoriteButton = getByTitle("Show favorite");
    expect(favoriteButton).toHaveStyle("background-color: rgb(240, 242, 245)");
    expect(favoriteButton).toHaveStyle("color: #333");
  });

  /**
   * Test case 5: 'Show Favorites' button styling changes when not active.
   * We ensure the button has the default styling when the filter is not active.
   */
  test("favorite button is not active when isFavoritesFilterActive is false", () => {
    const { getByTitle } = render(
      <MovieControls
        searchQuery=""
        isFavoritesFilterActive={false}
        onSearch={mockOnSearch}
        onAddMovie={mockOnAddMovie}
        onToggleFavorites={mockOnToggleFavorites}
      />
    );

    const favoriteButton = getByTitle("Show favorite");
    expect(favoriteButton).toHaveStyle("background-color: rgb(240, 242, 245)");
    expect(favoriteButton).toHaveStyle("color: white");
  });
});
