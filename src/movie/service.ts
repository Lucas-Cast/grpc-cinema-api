import { movie } from '../generated/movie'
import MovieRepository from './repository'
import { MovieCreateInput, MovieModel, MovieUpdateInput } from '../generated/prisma-client/models'

export class MovieService {
  constructor(private movieRepository: MovieRepository) {
    this.movieRepository = movieRepository
  }
  async getAllMovies(): Promise<MovieModel[]> {
    return await this.movieRepository.getAllMovies()
  }
  async getMovieById(id: string): Promise<MovieModel | null> {
    return this.movieRepository.getMovieById(parseInt(id))
  }
  async createMovie(data: movie.CreateMovie) {
    const { genreIds, actorIds, title, director, releaseYear } = data
    const movieData: MovieCreateInput = {
      title,
      director,
      releaseYear: releaseYear,
      ...(actorIds?.length && {
        actors: { connect: actorIds.map(id => ({ id })) },
      }),
      ...(genreIds?.length && {
        genres: { connect: genreIds.map(id => ({ id })) },
      }),
    }
    return this.movieRepository.createMovie(movieData)
  }
  async updateMovie(id: number, data: movie.UpdateMovie) {
    const { actorIds, genreIds, director, title, releaseYear } = data
    const movieData: MovieUpdateInput = {
      title,
      director,
      releaseYear,
      ...(actorIds?.length && {
        actors: { connect: actorIds.map(id => ({ id })) },
      }),
      ...(genreIds?.length && {
        genres: { set: genreIds.map(id => ({ id })) },
      }),
    }
    return this.movieRepository.updateMovie(id, movieData)
  }
  async deleteMovie(id: string) {
    return this.movieRepository.deleteMovie(parseInt(id))
  }
}
