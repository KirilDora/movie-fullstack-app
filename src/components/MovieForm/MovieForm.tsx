import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  useAddMovieMutation,
  useEditMovieMutation,
} from "../../store/features/movies/apiSlice";
import type { FormInputs, MovieFormProps } from "../../../shared/types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  ButtonContainer,
  CancelButton,
  ErrorMessage,
  FormField,
  Input,
  Label,
  StyledForm,
  SubmitButton,
} from "./MovieForm.style";

const MovieForm: React.FC<MovieFormProps> = ({ movie, onClose }) => {
  const { userId, username } = useSelector((state: RootState) => state.user);

  const isEditing = !!movie;
  const [addMovie, { isLoading: isAdding }] = useAddMovieMutation();
  const [editMovie, { isLoading: isEditingMovie }] = useEditMovieMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (isEditing && movie) {
      reset({
        title: movie.title,
        year: String(movie.year),
        runtime: movie.runtime,
        genre: movie.genre,
        director: movie.director,
        is_favorite: movie.is_favorite,
      });
    }
  }, [isEditing, movie, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!userId || !username) {
      console.error("User not authorised. Cannot save the movie.");
      return;
    }

    const movieData = {
      title: data.title,
      year: Number(data.year),
      runtime: data.runtime || "",
      genre: data.genre || "",
      director: data.director || "",
      is_favorite: movie?.is_favorite || false,
    };

    try {
      if (movie) {
        await editMovie({
          ...data,
          ...movieData,
          id: movie!.id,
          userId: userId,
          username: username,
        }).unwrap();
      } else {
        await addMovie({
          ...movieData,
          userId: userId,
          username: username,
        }).unwrap();
      }
      onClose();
    } catch (err) {
      console.error("Failed to save the movie:", err);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="title">Title:</Label>
        <Input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="year">Year:</Label>
        <Input {...register("year", { required: "Year is required" })} />
        {errors.year && <ErrorMessage>{errors.year.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Runtime:</Label>
        <Input {...register("runtime")} />
      </FormField>

      <FormField>
        <Label>Genre:</Label>
        <Input {...register("genre")} />
      </FormField>

      <FormField>
        <Label>Director:</Label>
        <Input {...register("director")} />
      </FormField>

      <ButtonContainer>
        <SubmitButton type="submit" disabled={isAdding || isEditingMovie}>
          {isEditing ? "Save" : "Add"}
        </SubmitButton>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </ButtonContainer>
    </StyledForm>
  );
};

export default MovieForm;
