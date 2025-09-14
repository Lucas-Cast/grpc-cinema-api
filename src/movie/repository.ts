import { PrismaClient } from '../generated/prisma-client/client'
import { MovieCreateInput, MovieModel, MovieUpdateInput } from '../generated/prisma-client/models'

export default class MovieRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getAllMovies(): Promise<MovieModel[]> {
    return await this.prisma.movie.findMany({
      include: {
        actors: true,
        genres: true,
      },
    })
  }

  async getMovieById(id: number): Promise<MovieModel | null> {
    return await this.prisma.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        genres: true,
      },
    })
  }

  async createMovie(data: MovieCreateInput) {
    return await this.prisma.movie.create({
      data,
      include: { actors: true, genres: true },
    })
  }

  async updateMovie(id: number, data: MovieUpdateInput) {
    return await this.prisma.movie.update({
      where: { id },
      data,
      include: { actors: true, genres: true },
    })
  }

  async deleteMovie(id: number) {
    return await this.prisma.movie.delete({
      where: { id },
      include: { actors: true, genres: true },
    })
  }
}
