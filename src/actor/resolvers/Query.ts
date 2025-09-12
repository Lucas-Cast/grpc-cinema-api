import { QueryResolvers } from '../../generated/graphql'

export const actorQueries: QueryResolvers = {
  actors: async (parent, args, context) => {
    return context.actorService.getAllActors()
  },

  actor: async (parent, { id }, context) => {
    return context.actorService.getActorById(id)
  },
}
