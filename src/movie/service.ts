import { CreateMovieInput, UpdateMovieInput } from '../generated/graphql'
import MovieRepository from './repository'

export class MovieService {
  constructor(private movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }
  async getAllMovies() {
    return this.movieRepository.getAllMovies()
  }
  async getMovieById(id: string) {
    return this.movieRepository.getMovieById(parseInt(id))
  }
  async createMovie(data: CreateMovieInput) {
    const { actors, genres, ...movieBaseData } = data
    const movieData = {
      ...movieBaseData,
      ...(actors?.length && {
        actors: { connect: actors.map(id => ({ id: parseInt(id) })) },
      }),
      ...(genres?.length && {
        genres: { connect: genres.map(id => ({ id: parseInt(id) })) },
      }),
    }
    return this.movieRepository.createMovie(movieData)
  }
  async updateMovie(id: string, data: UpdateMovieInput) {
    const { actors, genres, ...movieBaseData } = data
    const movieData = {
      title: movieBaseData.title ?? undefined,
      director: movieBaseData.director ?? undefined,
      releaseYear: movieBaseData.releaseYear ?? undefined,
      ...(actors?.length && {
        actors: { connect: actors.map(id => ({ id: parseInt(id) })) },
      }),
      ...(genres?.length && {
        genres: { set: genres.map(id => ({ id: parseInt(id) })) },
      }),
    }
    return this.movieRepository.updateMovie(parseInt(id), movieData)
  }
  async deleteMovie(id: string) {
    return this.movieRepository.deleteMovie(parseInt(id))
  }
}
