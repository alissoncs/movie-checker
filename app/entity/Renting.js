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

    const db = this.db

    // create a transaction to prevent concurrence
    return new Promise((res, rej) => {
      db.beginTransaction(err => {
        if(err) rej({
          code:500
        })
        super.save( {
          customer_id: data.customer_id,
          movie_id: data.movie_id,
          current: data.current && data.current == true ? 1 : 0
        } ).then((id) => {
          
          db.commit((err) => {
            res( id )
          })

        }).catch(() => {

          db.rollback(() => {
            rej({
              code: 500,
              message: 'Internal conflict, try to do this again'
            })
          })

        })

      })
    })

  }

  update( id, data) {

    return super.update( id, {
      customer_id: data.customer_id,
      movie_id: data.movie_id,
      current: data.current && data.current == true ? 1 : 0
    })

  }

}
