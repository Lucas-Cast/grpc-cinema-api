import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema/typeDefs'
import 'dotenv/config'
import { context } from './context'
import { resolvers } from './resolvers'

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  const { url } = await server.listen({ port: process.env.PORT || 4000 })

  console.log(`🚀 Server running at ${url}`)
  console.log(`📊 GraphQL Playground available at ${url}`)
}

startServer().catch(error => {
  console.error('Error starting server:', error)
})
