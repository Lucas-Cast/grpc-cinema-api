import { actor } from '../generated/actor'
import { ActorUpdateInput } from '../generated/prisma-client/models'
import ActorRepository from './repository'

export default class ActorService {
  constructor(private actorRepository: ActorRepository) {
    this.actorRepository = actorRepository
  }
  async getAllActors() {
    return this.actorRepository.getAllActors()
  }

  async getActorById(id: number) {
    return this.actorRepository.getActorById(id)
  }

  async createActor(data: actor.CreateActor) {
    return this.actorRepository.createActor(data)
  }

  async updateActor(id: number, data: actor.UpdateActor) {
    const actorData: ActorUpdateInput = {
      name: data.name ?? undefined,
      birthYear: data.birthYear ?? undefined,
    }

    return this.actorRepository.updateActor(id, actorData)
  }

  async deleteActor(id: number) {
    return this.actorRepository.deleteActor(id)
  }
}
