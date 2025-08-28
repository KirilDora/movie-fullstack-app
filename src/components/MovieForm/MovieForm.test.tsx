import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieForm from "./MovieForm";
import {
  useAddMovieMutation,
  useEditMovieMutation,
} from "../../store/features/movies/apiSlice";
import { useSelector } from "react-redux";
import type { Movie } from "../../../shared/types";

jest.mock("../../store/features/movies/apiSlice");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

/**
 * Suite of unit tests for the MovieForm component.
 * We'll test its behavior in different scenarios: adding a new movie and editing an existing one.
 */
describe("MovieForm", () => {
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

  const mockAddMovie = jest.fn();
  const mockUpdateMovie = jest.fn();
  const mockOnClose = jest.fn();

  const mockUseAddMovieMutation = useAddMovieMutation as jest.Mock;
  const mockUseUpdateMovieMutation = useEditMovieMutation as jest.Mock;

  const mockUseSelector = useSelector as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSelector.mockReturnValue({
      userId: "test-user-id",
      username: "testuser",
    });

    mockUseAddMovieMutation.mockReturnValue([
      mockAddMovie,
      { isLoading: false },
    ]);
    mockUseUpdateMovieMutation.mockReturnValue([
      mockUpdateMovie,
      { isLoading: false },
    ]);
    mockAddMovie.mockResolvedValue({ unwrap: () => Promise.resolve() });
    mockUpdateMovie.mockResolvedValue({ unwrap: () => Promise.resolve() });
  });

  /**
   * Test case 1: Component renders correctly in "Add" mode.
   * We check if the form title and button text are correct for adding a new movie.
   */
  test("renders in add mode correctly", () => {
    render(<MovieForm onClose={mockOnClose} />);

    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  /**
   * Test case 2: Component renders correctly in "Edit" mode.
   * We check if the form fields are pre-populated with movie data and the button text is correct.
   */
  test("renders in edit mode with pre-filled values", () => {
    render(<MovieForm movie={mockMovie} onClose={mockOnClose} />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText(/Title:/i)).toHaveValue(mockMovie.title);
    expect(screen.getByLabelText(/Year:/i)).toHaveValue(String(mockMovie.year));
    expect(screen.getByLabelText(/Runtime:/i)).toHaveValue(mockMovie.runtime);
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  /**
   * Test case 3: Displays validation errors when required fields are empty.
   */
  test("shows validation errors on form submission with empty fields", async () => {
    render(<MovieForm onClose={mockOnClose} />);

    const submitButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Year is required")).toBeInTheDocument();
    });
  });

  /**
   * Test case 4: Submits the form with new movie data and closes the modal.
   */
  test("submits new movie data and closes modal", async () => {
    render(<MovieForm onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/title:/i);
    const yearInput = screen.getByLabelText(/year:/i);
    const submitButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(titleInput, { target: { value: "New Movie" } });
    fireEvent.change(yearInput, { target: { value: "2023" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddMovie).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Movie",
          year: 2023,
          user_id: "test-user-id",
          username: "testuser",
        })
      );
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test case 5: Submits the form with updated movie data and closes the modal.
   */
  test("submits updated movie data and closes modal", async () => {
    render(<MovieForm movie={mockMovie} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/Title:/i);
    fireEvent.change(titleInput, { target: { value: "Updated Inception" } });

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateMovie).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockMovie.id,
          title: "Updated Inception",
          user_id: "test-user-id",
          username: "testuser",
        })
      );
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test case 6: Submit button is disabled while adding a movie.
   */
  test("add button is disabled when loading", async () => {
    mockUseAddMovieMutation.mockReturnValue([
      mockAddMovie,
      { isLoading: true },
    ]);
    render(<MovieForm onClose={mockOnClose} />);

    const addButton = screen.getByRole("button", { name: /Add/i });
    expect(addButton).toBeDisabled();
  });
});
