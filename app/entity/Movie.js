import BaseModel from '../util/BaseModel'

export default class Movie extends BaseModel {

  getTable() {
    return 'movies'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      title: Joi.string().required(),
      amount: Joi.number().optional()
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      title: data.title,
      amount: data.amount ? data.amount : 1
    } )

  }

  update( id, data) {

    return super.update( id, {
      title: data.title,
      amount: data.amount
    })

  }

  fetchByTitle( title ) {

    return this.fetchAll().then((data) => {

      // filter by name
      data = data.filter((item) => {

        let current = item.title.toLowerCase()
        title = title.toLowerCase()

        return current.indexOf( title ) >= 0

      })

      return data

    })

  }

}
