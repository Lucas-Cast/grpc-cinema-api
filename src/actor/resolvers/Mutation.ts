import { MutationResolvers } from '../../generated/graphql'

export const actorMutations: MutationResolvers = {
  createActor: async (parent, args, context) => {
    return context.actorService.createActor(args.input)
  },

  updateActor: async (parent, { id, input }, context) => {
    return context.actorService.updateActor(id, input)
  },
  deleteActor: async (parent, { id }, context) => {
    return context.actorService.deleteActor(id)
  },
}
