import { ActorResponse } from '../actor/models/response'
import { MovieEntity } from '../movie/entities/movie'
import { MovieActorEntity } from '../movie/entities/movie-actor'

export const getMovieWithActors = (
  movie: MovieEntity[],
  movieActor: MovieActorEntity[],
  actor: ActorResponse[]
) => {
  const movieWithActors = movie.map(m => {
    const actorsIds = movieActor.filter(ma => ma.movieId === m.id).map(ma => ma.actorId)
    const actors = actor.filter(a => actorsIds.includes(a.id))
    return { ...m, actors }
  })
  return movieWithActors
}

export const deleteOrUpdateMovieActorsByMovieId = (
  movieActor: MovieActorEntity[],
  movieId: string,
  relationsToUpdate: MovieActorEntity[] = []
) => {
  const filteredMovieActorRelations = movieActor.filter(ma => ma.movieId !== movieId)
  movieActor.length = 0
  movieActor.push(...filteredMovieActorRelations, ...relationsToUpdate)
}
