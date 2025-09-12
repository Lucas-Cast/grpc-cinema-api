import { Router } from 'express'
import { MovieController } from '../movie/controller'
const movieRoute = Router()

movieRoute.get('/movies', MovieController.getAllMovies)

movieRoute.post('/movies', MovieController.createMovie)

movieRoute.get('/movies/:id', MovieController.getMovieById)

movieRoute.put('/movies/:id', MovieController.updateMovie)

movieRoute.delete('/movies/:id', MovieController.deleteMovie)

export default movieRoute
