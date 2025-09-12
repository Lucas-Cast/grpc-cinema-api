import { CreateGenreInput, UpdateGenreInput } from '../generated/graphql'
import { GenreCreateInput, GenreUpdateInput } from '../generated/prisma-client/models'
import { GenreRepository } from './repository'

export class GenreService {
  constructor(private readonly genresRepository: GenreRepository) {
    this.genresRepository = genresRepository
  }
  async getAllGenres() {
    return await this.genresRepository.getAllGenres()
  }
  async getGenreById(id: string) {
    return await this.genresRepository.getGenreById(parseInt(id))
  }
  async createGenre(input: CreateGenreInput) {
    const genreData: GenreCreateInput = {
      name: input.name,
      ...(input.movies?.length && {
        movies: {
          connect: input.movies.map(id => ({ id: parseInt(id) })),
        },
      }),
    }

    return await this.genresRepository.create(genreData)
  }
  async updateGenre(id: string, input: UpdateGenreInput) {
    const genreData: GenreUpdateInput = {
      name: input.name ?? undefined,
      ...(input.movies?.length && {
        movies: {
          set: input.movies.map(id => ({ id: parseInt(id) })),
        },
      }),
    }

    return await this.genresRepository.update(parseInt(id), genreData)
  }
  async deleteGenre(id: string) {
    return await this.genresRepository.delete(parseInt(id))
  }
}
