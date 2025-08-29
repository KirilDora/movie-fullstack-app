export interface User {
    id: number;
    username: string;
}
export interface Movie {
    id: number;
    title: string;
    year: number;
    runtime: string;
    genre: string;
    director: string;
    userId: number;
    is_favorite: boolean;
}
export interface MovieForm {
    title: string;
    year: number;
    runtime: string;
    genre: string;
    director: string;
    is_favorite?: boolean;
}
export interface OmdbFullMovie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
export interface OmdbSearchResponse {
    Search: OmdbMovie[];
    totalResults: string;
    Response: string;
}
export interface OmdbMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
export interface ToggleFavoriteMutationArgs extends Movie {
    userId: number;
    username: string;
}
export interface AddMoviePayload extends Omit<Movie, "id"> {
    username: string;
}
export interface UpdateMoviePayload extends Movie {
    username: string;
}
export interface DeleteMoviePayload {
    id: number;
    userId: number;
    username: string;
}
export interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export interface MovieCardProps {
    movie: Movie;
    onEdit: (movie: Movie) => void;
    onDelete: (id: number) => void;
    onToggleFavorite: (movie: Movie) => void;
}
export interface MovieControlsProps {
    searchQuery: string;
    isFavoritesFilterActive: boolean;
    onSearch: (query: string) => void;
    onToggleFavorites: () => void;
    onAddMovie: () => void;
}
export interface MovieFormProps {
    movie?: Movie;
    onClose: () => void;
}
export interface FormInputs {
    title: string;
    year: string;
    runtime: string;
    genre: string;
    director: string;
    is_favorite: boolean;
}
export interface MovieListProps {
    movies: Movie[] | [];
    isLoading: boolean;
    error: string | null;
    onEdit: (movie: Movie) => void;
    onDelete: (id: number) => void;
    onToggleFavorite: (movie: Movie) => void;
}
export interface UserPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUsernameSubmit: (username: string) => void;
}
