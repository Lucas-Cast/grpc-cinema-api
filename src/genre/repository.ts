import { PrismaClient } from '../generated/prisma-client/client'
import { GenreCreateInput, GenreUpdateInput } from '../generated/prisma-client/models'

export class GenreRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma
  }
  async getAllGenres() {
    return await this.prisma.genre.findMany({ include: { movies: true } })
  }
  async getGenreById(id: number) {
    return await this.prisma.genre.findUnique({ where: { id }, include: { movies: true } })
  }
  async create(input: GenreCreateInput) {
    return await this.prisma.genre.create({ data: input, include: { movies: true } })
  }
  async update(id: number, input: GenreUpdateInput) {
    return await this.prisma.genre.update({ where: { id }, data: input, include: { movies: true } })
  }

  async delete(id: number) {
    return await this.prisma.genre.delete({ where: { id }, include: { movies: true } })
  }
}
