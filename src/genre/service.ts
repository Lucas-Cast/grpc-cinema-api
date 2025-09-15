import { genre } from '../generated/genre'
import { GenreCreateInput, GenreUpdateInput } from '../generated/prisma-client/models'
import { GenreRepository } from './repository'

export class GenreService {
  constructor(private readonly genresRepository: GenreRepository) {
    this.genresRepository = genresRepository
  }
  async getAllGenres() {
    return await this.genresRepository.getAllGenres()
  }
  async getGenreById(id: number) {
    return await this.genresRepository.getGenreById(id)
  }
  async createGenre(input: genre.CreateGenre) {
    const genreData: GenreCreateInput = {
      name: input.name,
      ...(input.movieIds?.length && {
        movies: {
          connect: input.movieIds.map(id => ({ id })),
        },
      }),
    }

    return await this.genresRepository.create(genreData)
  }
  async updateGenre(id: number, input: genre.UpdateGenre) {
    const genreData: GenreUpdateInput = {
      name: input.name,
      ...(input.movieIds?.length && {
        movies: {
          set: input.movieIds.map(id => ({
            id,
          })),
        },
      }),
    }

    return await this.genresRepository.update(id, genreData)
  }
  async deleteGenre(id: number) {
    return await this.genresRepository.delete(id)
  }
}
