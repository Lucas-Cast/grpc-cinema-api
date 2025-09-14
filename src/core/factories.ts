import ActorService from '../actor/service'
import { MovieService } from '../movie/service'
import MovieRepository from '../movie/repository'
import ActorRepository from '../actor/repository'
import { GenreService } from '../genre/service'
import { GenreRepository } from '../genre/repository'
import { movieImplementation } from '../movie/implementation'
import { PrismaClient } from '../generated/prisma-client/client'
import { genreImplementation } from '../genre/implementation'
import { actorImplementation } from '../actor/implementation'

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

export class ImplementationFactory {
  static createImplementations(prisma: PrismaClient) {
    const { movieService, actorService, genreService } = ServiceFactory.createServices(prisma)

    return {
      movieImplementation: movieImplementation(movieService),
      actorImplementation: actorImplementation(actorService),
      genreImplementation: genreImplementation(genreService),
    }
  }
}
