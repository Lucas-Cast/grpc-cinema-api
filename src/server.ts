import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import 'dotenv/config'
import { loadSync } from '@grpc/proto-loader'
import { PrismaClient } from './generated/prisma-client/client'
import { ImplementationFactory } from './core/factories'

const packageDefinition = loadSync([
  __dirname + '/../proto/movie.proto',
  __dirname + '/../proto/actor.proto',
  __dirname + '/../proto/genre.proto',
])
const moviePackage = loadPackageDefinition(packageDefinition).movie as any
const actorPackage = loadPackageDefinition(packageDefinition).actor as any
const genrePackage = loadPackageDefinition(packageDefinition).genre as any

const server = new Server()

const prisma = new PrismaClient()
const { movieImplementation, actorImplementation, genreImplementation } =
  ImplementationFactory.createImplementations(prisma)

server.addService(moviePackage.MovieService.service, movieImplementation)
server.addService(actorPackage?.ActorService.service, actorImplementation)
server.addService(genrePackage.GenreService.service, genreImplementation)

async function startServer() {
  const port = process.env.PORT || '4000'
  server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC Server running at http://localhost:${port}`)
    server
  })
}

startServer().catch(error => {
  console.error('Error starting server:', error)
})
