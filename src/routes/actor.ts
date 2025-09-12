import { Router } from 'express'
import ActorController from '../actor/controller'
const actorRoute = Router()

actorRoute.get('/actors', ActorController.getAllActors)

actorRoute.post('/actors', ActorController.createActor)

actorRoute.get('/actors/:id', ActorController.getActorById)

actorRoute.put('/actors/:id', ActorController.updateActor)

actorRoute.delete('/actors/:id', ActorController.deleteActor)

export default actorRoute
