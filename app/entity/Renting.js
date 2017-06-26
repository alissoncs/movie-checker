import BaseModel from '../util/BaseModel'

export default class Renting extends BaseModel {

  getTable() {
    return 'rentings'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      customer_id: Joi.number().integer().required(),
      movie_id: Joi.number().integer().required(),
      current: Joi.number().integer().optional(),
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      customer_id: data.customer_id,
      movie_id: data.movie_id,
      current: data.current && data.current == true ? 1 : 0
    } )

  }

  update( id, data) {

    return super.update( id, {
      customer_id: data.customer_id,
      movie_id: data.movie_id,
      current: data.current && data.current == true ? 1 : 0
    })

  }

}
