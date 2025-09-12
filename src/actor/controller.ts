import { ActorByIdRequest, ActorUpdateRequest } from './models/request'
import ActorService from './service'
import { Request, Response } from 'express'

export default class ActorController {
  static async getAllActors(req: Request, res: Response) {
    const actors = await ActorService.getAllActors()

    const actorsWithLinks = actors.map((actor: any) => ({
      ...actor,
      _links: {
        self: { href: `/actors/${actor.id}`, method: 'GET' },
        edit: { href: `/actors/${actor.id}`, method: 'PUT' },
        delete: { href: `/actors/${actor.id}`, method: 'DELETE' },
      },
    }))

    const response = {
      actors: actorsWithLinks,
      _links: {
        self: { href: '/actors', method: 'GET' },
        create: { href: '/actors', method: 'POST' },
      },
    }

    return res.status(200).json(response)
  }

  static async getActorById(req: Request<ActorByIdRequest>, res: Response) {
    const { id } = req.params
    const actor = await ActorService.getActorById(Number(id))

    if (actor) {
      const response = {
        ...actor,
        _links: {
          self: { href: `/actors/${actor.id}`, method: 'GET' },
          edit: { href: `/actors/${actor.id}`, method: 'PUT' },
          delete: { href: `/actors/${actor.id}`, method: 'DELETE' },
          collection: { href: '/actors', method: 'GET' },
        },
      }

      return res.status(200).json(response)
    }

    const errorResponse = {
      message: 'Actor not found',
      _links: {
        collection: { href: '/actors', method: 'GET' },
      },
    }

    return res.status(404).json(errorResponse)
  }

  static async createActor(req: Request, res: Response) {
    const actor = await ActorService.createActor(req.body)

    const response = {
      ...actor,
      _links: {
        self: { href: `/actors/${actor.id}`, method: 'GET' },
        edit: { href: `/actors/${actor.id}`, method: 'PUT' },
        delete: { href: `/actors/${actor.id}`, method: 'DELETE' },
        collection: { href: '/actors', method: 'GET' },
      },
    }

    return res.status(201).json(response)
  }

  static async updateActor(req: Request<ActorUpdateRequest>, res: Response) {
    const { id } = req.params
    const actor = await ActorService.updateActor(Number(id), req.body)

    if (actor) {
      const response = {
        ...actor,
        _links: {
          self: { href: `/actors/${actor.id}`, method: 'GET' },
          edit: { href: `/actors/${actor.id}`, method: 'PUT' },
          delete: { href: `/actors/${actor.id}`, method: 'DELETE' },
          collection: { href: '/actors', method: 'GET' },
        },
      }

      return res.status(200).json(response)
    }

    const errorResponse = {
      message: 'Actor not found',
      _links: {
        collection: { href: '/actors', method: 'GET' },
      },
    }

    return res.status(404).json(errorResponse)
  }

  static async deleteActor(req: Request<ActorByIdRequest>, res: Response) {
    const { id } = req.params
    const actor = await ActorService.deleteActor(Number(id))

    if (actor) {
      const response = {
        message: 'Actor deleted successfully',
        deletedActor: {
          ...actor,
          _links: {
            collection: { href: '/actors', method: 'GET' },
          },
        },
        _links: {
          collection: { href: '/actors', method: 'GET' },
          create: { href: '/actors', method: 'POST' },
        },
      }

      return res.status(200).json(response)
    }

    const errorResponse = {
      message: 'Actor not found',
      _links: {
        collection: { href: '/actors', method: 'GET' },
      },
    }

    return res.status(404).json(errorResponse)
  }
}
