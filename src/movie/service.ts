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
    const { genre_ids, actor_ids, title, director, release_year: releaseYear } = data
    const movieData: MovieCreateInput = {
      title,
      director,
      releaseYear,
      ...(actor_ids?.length && {
        actors: { connect: actor_ids.map(id => ({ id })) },
      }),
      ...(genre_ids?.length && {
        genres: { connect: genre_ids.map(id => ({ id })) },
      }),
    }
    return this.movieRepository.createMovie(movieData)
  }
  async updateMovie(id: number, data: movie.UpdateMovie) {
    const { actor_ids, genre_ids, director, title, release_year: releaseYear } = data
    const movieData: MovieUpdateInput = {
      title,
      director,
      releaseYear,
      ...(actor_ids?.length && {
        actors: { connect: actor_ids.map(id => ({ id })) },
      }),
      ...(genre_ids?.length && {
        genres: { set: genre_ids.map(id => ({ id })) },
      }),
    }
    return this.movieRepository.updateMovie(id, movieData)
  }
  async deleteMovie(id: string) {
    return this.movieRepository.deleteMovie(parseInt(id))
  }
}
