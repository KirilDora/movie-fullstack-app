import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import { useEffect, useState } from "react";
import {
  useSearchOmdbMoviesQuery,
  useDeleteMovieMutation,
  useToggleFavoriteMutation,
  useEnsureUserMutation,
  useGetMoviesQuery,
} from "./store/features/movies/apiSlice";
import Modal from "react-modal";
import MovieForm from "./components/MovieForm/MovieForm";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import type { Movie } from "../shared/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store/store";
import type { RootState } from "./store/store";
import { setUser } from "./store/features/users/userSlice";
import UserPromptModal from "./components/UserPromtModal/UserPromtModal";
import MovieControls from "./components/MovieControls/MovieControls";
import { getErrorMessage } from "./utils/errorMessage";
import {
  AppContainer,
  Header,
  MainContent,
  Title,
  WelcomeMessage,
} from "./App.style";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userId, username } = useSelector((state: RootState) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(
    undefined
  );
  const [isUserPromptOpen, setIsUserPromptOpen] = useState(false);
  const [isFavoritesFilterActive, setIsFavoritesFilterActive] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

  const [ensureUser] = useEnsureUserMutation();
  const [deleteMovie] = useDeleteMovieMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();

  useEffect(() => {
    if (!userId) {
      setIsUserPromptOpen(true);
    }
  }, [userId]);

  const handleUsernameSubmit = async (submittedUsername: string) => {
    try {
      const response = await ensureUser({
        username: submittedUsername,
      }).unwrap();
      dispatch(
        setUser({ userId: response.userId, username: submittedUsername })
      );
    } catch (err) {
      console.error("Failed to create/get user:", err);
    }
  };

  const {
    data: omdbMovies,
    isLoading: isOmdbLoading,
    error: omdbError,
  } = useSearchOmdbMoviesQuery(
    { searchQuery },
    { skip: searchQuery.trim() === "" }
  );

  const {
    data: favoriteMovies,
    isLoading: isFavoritesLoading,
    error: favoritesError,
  } = useGetMoviesQuery(
    { userId, username },
    {
      skip: !username,
    }
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsFavoritesFilterActive(false);
  };

  const handleToggleFavorites = () => {
    setIsFavoritesFilterActive(!isFavoritesFilterActive);
  };

  const openAddModal = () => {
    setEditingMovie(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    setMovieToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (movieToDelete) {
      try {
        if (!userId || !username) {
          console.error("User not authenticated.");
          return;
        }
        await deleteMovie({
          id: movieToDelete,
          userId: userId,
          username,
        }).unwrap();
      } catch (err) {
        console.error("Ошибка при удалении фильма:", err);
      } finally {
        setIsConfirmModalOpen(false);
        setMovieToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setMovieToDelete(null);
  };

  const handleToggleFavorite = async (movie: Movie) => {
    if (!userId || !username) {
      console.error("User not authenticated.");
      return;
    }
    try {
      await toggleFavorite({ ...movie, userId, username }).unwrap();
    } catch (err) {
      console.error("Ошибка при обновлении избранного:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let moviesToDisplay: Movie[] = [];
  if (isFavoritesFilterActive) {
    moviesToDisplay =
      favoriteMovies?.filter((movie) => movie.is_favorite) || [];
  } else if (searchQuery.trim() !== "") {
    moviesToDisplay = omdbMovies || [];
  } else {
    moviesToDisplay = favoriteMovies || [];
  }

  return (
    <AppContainer>
      <MainContent>
        <Header>
          <Title>Movie Catalog</Title>
          {username && <WelcomeMessage>Welcome, {username}!</WelcomeMessage>}
        </Header>

        {username && (
          <MovieControls
            searchQuery={searchQuery}
            isFavoritesFilterActive={isFavoritesFilterActive}
            onSearch={handleSearch}
            onAddMovie={openAddModal}
            onToggleFavorites={handleToggleFavorites}
          />
        )}

        <MovieList
          movies={moviesToDisplay || []}
          isLoading={isOmdbLoading || isFavoritesLoading}
          error={
            omdbError || favoritesError
              ? getErrorMessage(omdbError || favoritesError)
              : null
          }
          onEdit={openEditModal}
          onDelete={handleDeleteClick}
          onToggleFavorite={handleToggleFavorite}
        />
      </MainContent>

      <UserPromptModal
        isOpen={isUserPromptOpen}
        onClose={() => setIsUserPromptOpen(false)}
        onUsernameSubmit={handleUsernameSubmit}
      />

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <MovieForm movie={editingMovie} onClose={closeModal} />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message="Are you sure to delete this movie?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AppContainer>
  );
}

export default App;
