import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AddMoviePayload,
  DeleteMoviePayload,
  Movie,
  OmdbFullMovie,
  ToggleFavoriteMutationArgs,
  UpdateMoviePayload,
} from "../../../../shared/types";
import type { UserState } from "../users/userSlice";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    searchOmdbMovies: builder.query<Movie[], { searchQuery: string }>({
      query: (searchQuery) => `omdb-movies/search?t=${searchQuery.searchQuery}`,
      providesTags: [],
      transformResponse: (response: OmdbFullMovie) => {
        if (response.Response !== "True") {
          return [];
        }

        const transformedMovie = {
          title: response.Title,
          year: Number(response.Year),
          runtime: response.Runtime,
          genre: response.Genre,
          director: response.Director,
          id: -1,
          userId: -1,
          username: "uknown",
          is_favorite: false,
        };

        return [transformedMovie];
      },
    }),
    getMovies: builder.query<Movie[], UserState>({
      query: (user) => `movies/${user.username}`,
      providesTags: ["Movies"],
    }),
    addMovie: builder.mutation<Movie, AddMoviePayload>({
      query: (newMovie) => ({
        url: "movies",
        method: "POST",
        body: newMovie,
      }),
      invalidatesTags: ["Movies"],
    }),
    editMovie: builder.mutation<Movie, UpdateMoviePayload>({
      query: (movie) => ({
        url: `movies/${movie.id}`,
        method: "PUT",
        body: movie,
      }),
      invalidatesTags: ["Movies"],
    }),
    deleteMovie: builder.mutation<void, DeleteMoviePayload>({
      query: (payload) => ({
        url: `movies/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Movies"],
    }),
    toggleFavorite: builder.mutation<Movie, ToggleFavoriteMutationArgs>({
      query: (movie) => ({
        url: `movies/toggle-favorite`,
        method: "PUT",
        body: { ...movie },
      }),
      invalidatesTags: ["Movies"],
    }),
    ensureUser: builder.mutation<{ userId: number }, { username: string }>({
      query: ({ username }) => ({
        url: "users",
        method: "POST",
        body: { username },
      }),
    }),
  }),
});

export const {
  useSearchOmdbMoviesQuery,
  useGetMoviesQuery,
  useAddMovieMutation,
  useEditMovieMutation,
  useDeleteMovieMutation,
  useToggleFavoriteMutation,
  useEnsureUserMutation,
} = moviesApi;
