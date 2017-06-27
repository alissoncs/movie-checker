import BaseModel from '../util/BaseModel'
//import md5 from 'md5'
const md5 = require('md5')

export default class User extends BaseModel {

  getTable() {
    return 'users'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      name: data.name,
      email: data.email,
      password: md5( data.password )
    } ).catch( err=> {

      if(err && err.code && err.code == 'ER_DUP_ENTRY') {

        throw ({
          code: User.VALIDATION_ERROR,
          message: 'Already exists e-mail ' + data.email
        })

      }
      else {
        throw err
      }

    })

  }

  update( id, data) {

    return super.update( id, {
      name: data.name,
      email: data.email,
      password: md5( data.password )
    })

  }

}
