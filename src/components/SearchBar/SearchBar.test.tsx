import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

/**
 * Suite of unit tests for the SearchBar component.
 * We'll test its behavior with user input, button clicks, and keyboard events.
 */
describe("SearchBar", () => {
  const mockOnSearch = jest.fn();

  /**
   * Test case 1: Component renders correctly with input field and button.
   */
  test("renders the search input and button", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  /**
   * Test case 2: Input field value changes on user typing.
   */
  test("updates input value on change", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
    const testQuery = "The Matrix";

    fireEvent.change(searchInput, { target: { value: testQuery } });

    expect(searchInput).toHaveValue(testQuery);
  });

  /**
   * Test case 3: onSearch is called when the search button is clicked with a valid query.
   */
  test("calls onSearch with query when search button is clicked", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
    const searchButton = screen.getByRole("button", { name: /Search/i });
    const testQuery = "Inception";

    fireEvent.change(searchInput, { target: { value: testQuery } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(testQuery);
  });

  /**
   * Test case 4: onSearch is called when the "Enter" key is pressed.
   */
  test("calls onSearch with query when Enter key is pressed", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search for a movie.../i);
    const testQuery = "Interstellar";

    fireEvent.change(searchInput, { target: { value: testQuery } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(testQuery);
  });

  /**
   * Test case 5: onSearch is NOT called when the search button is clicked with an empty query.
   */
  test("does not call onSearch with an empty query on button click", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
