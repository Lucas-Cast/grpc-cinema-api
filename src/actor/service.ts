import { CreateActorInput, UpdateActorInput } from '../generated/graphql'
import { ActorUpdateInput } from '../generated/prisma-client/models'
import ActorRepository from './repository'

export default class ActorService {
  constructor(private actorRepository: ActorRepository) {
    this.actorRepository = actorRepository
  }
  async getAllActors() {
    return this.actorRepository.getAllActors()
  }

  async getActorById(id: string) {
    return this.actorRepository.getActorById(parseInt(id))
  }

  async createActor(data: CreateActorInput) {
    return this.actorRepository.createActor(data)
  }

  async updateActor(id: string, data: UpdateActorInput) {
    const actorData: ActorUpdateInput = {
      name: data.name ?? undefined,
      birthYear: data.birthYear ?? undefined,
    }

    return this.actorRepository.updateActor(parseInt(id), actorData)
  }

  async deleteActor(id: string) {
    return this.actorRepository.deleteActor(parseInt(id))
  }
}
