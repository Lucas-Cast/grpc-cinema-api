import { ServerUnaryCall } from '@grpc/grpc-js'
import ActorService from './service'
import { UnaryCallback } from '@grpc/grpc-js/build/src/client'
import { ActorModel } from '../generated/prisma-client/models'
import { actor } from '../generated/actor'

export const actorImplementation = (actorService: ActorService) => ({
  async getAllActors(call: ServerUnaryCall<any, any>, callback: UnaryCallback<ActorModel[]>) {
    await actorService
      .getAllActors()
      .then(actors => {
        callback(null, actors)
      })
      .catch((err: any) => {
        callback(err, [])
      })
  },
  async getActorById(
    call: ServerUnaryCall<actor.ActorId, ActorModel | null>,
    callback: UnaryCallback<ActorModel | null>
  ) {
    const { id } = call.request
    await actorService
      .getActorById(id)
      .then(actor => {
        callback(null, actor)
      })
      .catch(err => {
        callback(err, null)
      })
  },
  async createActor(
    call: ServerUnaryCall<actor.CreateActor, ActorModel>,
    callback: UnaryCallback<ActorModel>
  ) {
    const actorData = call.request
    await actorService
      .createActor(actorData)
      .then(actor => {
        callback(null, actor)
      })
      .catch(err => {
        callback(err, {} as ActorModel)
      })
  },
  async updateActor(
    call: ServerUnaryCall<actor.UpdateActor, ActorModel>,
    callback: UnaryCallback<ActorModel>
  ) {
    const actorData = call.request
    await actorService
      .updateActor(actorData.id, actorData)
      .then(actor => {
        callback(null, actor)
      })
      .catch(err => {
        callback(err, {} as ActorModel)
      })
  },
  async deleteActor(
    call: ServerUnaryCall<actor.ActorId, ActorModel>,
    callback: UnaryCallback<ActorModel>
  ) {
    const { id } = call.request
    await actorService
      .deleteActor(id)
      .then(actor => {
        callback(null, actor)
      })
      .catch(err => {
        callback(err, {} as ActorModel)
      })
  },
})
