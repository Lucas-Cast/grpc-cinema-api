import ActorService from './actor/service'
import { MovieService } from './movie/service'
import { Request } from 'express'
import { ServiceFactory } from './core/service-factory'
import { GenreService } from './genre/service'
import { PrismaClient } from './generated/prisma-client/client'

export interface Context extends Request {
  movieService: MovieService
  actorService: ActorService
  genreService: GenreService
}

export type GraphQLContext = Context

const prisma = new PrismaClient()

export const context = ({ req }: { req: Request }): GraphQLContext => {
  const { movieService, actorService, genreService } = ServiceFactory.createServices(prisma)
  return {
    ...req,
    movieService,
    actorService,
    genreService,
  } as GraphQLContext
}
