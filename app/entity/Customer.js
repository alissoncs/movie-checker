import BaseModel from '../util/BaseModel'

export default class Customer extends BaseModel {

  getTable() {
    return 'customers'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      name: Joi.string().required(),
      address: Joi.optional()
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      name: data.name,
      address: data.address ? data.address : null
    } )

  }

  update( id, data) {

    return super.update( id, {
      name: data.name,
      address: data.address ? data.address : null
    })

  }

}
