import { ServerUnaryCall } from '@grpc/grpc-js'
import { GenreService } from './service'
import { UnaryCallback } from '@grpc/grpc-js/build/src/client'
import { genre } from '../generated/genre'
import { GenreModel } from '../generated/prisma-client/models'

export const genreImplementation = (genreService: GenreService) => ({
  async getAllGenres(
    call: ServerUnaryCall<any, any>,
    callback: UnaryCallback<{ genres: GenreModel[] }>
  ) {
    await genreService
      .getAllGenres()
      .then(genres => {
        callback(null, { genres })
      })
      .catch(err => {
        callback(err, { genres: [] })
      })
  },
  async getGenreById(
    call: ServerUnaryCall<genre.GenreId, GenreModel | null>,
    callback: UnaryCallback<GenreModel | null>
  ) {
    const { id } = call.request
    await genreService
      .getGenreById(id)
      .then(genre => {
        callback(null, genre)
      })
      .catch(err => {
        callback(err, null)
      })
  },
  async createGenre(
    call: ServerUnaryCall<genre.CreateGenre, GenreModel>,
    callback: UnaryCallback<GenreModel>
  ) {
    const genreData = call.request
    await genreService
      .createGenre(genreData)
      .then(genre => {
        callback(null, genre)
      })
      .catch(err => {
        callback(err, {} as GenreModel)
      })
  },

  async updateGenre(
    call: ServerUnaryCall<genre.UpdateGenre, GenreModel>,
    callback: UnaryCallback<GenreModel>
  ) {
    const genreData = call.request
    await genreService
      .updateGenre(genreData.id, genreData)
      .then(genre => {
        callback(null, genre)
      })
      .catch(err => {
        callback(err, {} as GenreModel)
      })
  },
  async deleteGenre(
    call: ServerUnaryCall<genre.GenreId, GenreModel>,
    callback: UnaryCallback<GenreModel>
  ) {
    const { id } = call.request
    await genreService
      .deleteGenre(id)
      .then(genre => {
        callback(null, genre)
      })
      .catch(err => {
        callback(err, {} as GenreModel)
      })
  },
})
