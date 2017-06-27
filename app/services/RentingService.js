import Joi from 'joi'
import Renting from '../entity/Renting'
import Customer from '../entity/Customer'
import Movie from '../entity/Movie'

export default class RentingService {

  makeRent( data ) {

    const schema = {
      customer_id: Joi.number().required(),
      movie_id: Joi.number().required(),
    }

    const {error} = Joi.validate( data, schema )

    if(error) {
      // throw validation error
      return Promise.reject({
        code: Renting.VALIDATION_ERROR,
        errors: error.details
      })

    }

    let movie = new Movie
    let customer = new Customer
    let renting = new Renting

    // validates weither exists the movie
    return movie.fetchById( data.movie_id )
    .then(
      () => customer.fetchById( data.customer_id )
    ).then(
      () => renting.exists( data )
    )
    ).then(
      () => renting.save( data )
    )

  }

}
