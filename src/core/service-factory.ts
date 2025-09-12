import { PrismaClient } from '@prisma/client'
import ActorService from '../actor/service'
import { MovieService } from '../movie/service'
import MovieRepository from '../movie/repository'
import ActorRepository from '../actor/repository'
import { GenreService } from '../genre/service'
import { GenreRepository } from '../genre/repository'

export class ServiceFactory {
  static createServices(prisma: PrismaClient) {
    const movieRepository = new MovieRepository(prisma)
    const actorRepository = new ActorRepository(prisma)
    const genreRepository = new GenreRepository(prisma)

    const movieService = new MovieService(movieRepository)
    const actorService = new ActorService(actorRepository)
    const genreService = new GenreService(genreRepository)

    return {
      movieService,
      actorService,
      genreService,
    }
  }
}
