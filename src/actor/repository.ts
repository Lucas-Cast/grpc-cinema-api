import { ActorCreateInput, ActorUpdateInput } from '../generated/prisma-client/models'
import { PrismaClient } from '../generated/prisma-client/client'

export default class ActorRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma
  }
  async getAllActors() {
    return await this.prisma.actor.findMany()
  }

  async getActorById(id: number) {
    return await this.prisma.actor.findUnique({
      where: { id },
    })
  }

  async createActor(data: ActorCreateInput) {
    return await this.prisma.actor.create({
      data,
    })
  }

  async updateActor(id: number, data: ActorUpdateInput) {
    return await this.prisma.actor.update({
      where: { id },
      data,
    })
  }

  async deleteActor(id: number) {
    return await this.prisma.actor.delete({
      where: { id },
    })
  }
}
