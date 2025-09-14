import { ServerUnaryCall } from '@grpc/grpc-js'
import { MovieService } from '../movie/service'
import { UnaryCallback } from '@grpc/grpc-js/build/src/client'
import { movie } from '../generated/movie'
import { MovieModel } from '../generated/prisma-client/models'

export const movieImplementation = (movieService: MovieService) => ({
  async getAllMovies(
    call: ServerUnaryCall<any, any>,
    callback: UnaryCallback<MovieModel[]>
  ): Promise<void> {
    await movieService
      .getAllMovies()
      .then(movies => callback(null, movies))
      .catch(err => callback(err, []))
  },
  async getMovieById(
    call: ServerUnaryCall<movie.MovieId, MovieModel | null>,
    callback: UnaryCallback<MovieModel | null>
  ): Promise<void> {
    const { id } = call.request
    await movieService
      .getMovieById(id)
      .then(movie => callback(null, movie))
      .catch(err => callback(err, null))
  },
  async createMovie(
    call: ServerUnaryCall<movie.CreateMovie, MovieModel>,
    callback: UnaryCallback<MovieModel>
  ): Promise<void> {
    const movieData = call.request
    await movieService
      .createMovie(movieData)
      .then(movie => callback(null, movie))
      .catch(err => callback(err, {} as MovieModel))
  },
  async updateMovie(
    call: ServerUnaryCall<movie.UpdateMovie, MovieModel>,
    callback: UnaryCallback<MovieModel>
  ): Promise<void> {
    const movieData = call.request
    await movieService
      .updateMovie(movieData.id, movieData)
      .then(movie => callback(null, movie))
      .catch(err => callback(err, {} as MovieModel))
  },

  async deleteMovie(
    call: ServerUnaryCall<movie.MovieId, MovieModel>,
    callback: UnaryCallback<MovieModel>
  ): Promise<void> {
    const { id } = call.request
    await movieService
      .deleteMovie(id)
      .then(movie => callback(null, movie))
      .catch(err => callback(err, {} as MovieModel))
  },
})
