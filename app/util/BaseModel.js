export default class BaseModel {

  static get NOT_FOUND() {
    return 404;
  }
  static get VALIDATION_ERROR() {
    return 400;
  }

  getTable() {
    return 'assign_table'
  }

  // this is an example of validate method
  validate( data ) {

    const Joi = this.joi

    const schema = {
    };

    const {error, value} = Joi.validate( data, schema)

  }

  constructor( data , modules = {}) {

    this.qb = modules.qb ? modules.qb : require('squel')

    this.joi = modules.joi ? modules.joi : require('joi')

    this.db = modules.db ? modules.db : require('../database')

    this.data = data

  }

  // method to save a  register
  save( data ) {

    if(!data)
      data = this.data

    const {error} = this.validate(data)

    if(error) {
      return Promise.reject( {
        code: BaseModel.VALIDATION_ERROR,
        errors: error.details
      })
    }

    let query = this.qb
    .insert()
    .into(this.getTable())
    .setFields( data )

    return new Promise( (res, rej) => {

      return this.db.query( query.toString(), (error, result, fields) => {

        if( error )
          rej(error)
        else
          res( result.insertId )

      })

    })

  }

  fetchAll() {

    let query = this.qb
    .select()
    .from(this.getTable())

    return new Promise( (res, rej) => {
      return this.db.query( query.toString(), (error, result) => {
        if( error )
          rej()
        else
          res( result )
      })
    })

  }

  fetchById( id ) {

    let query = this.qb
    .select()
    .from(this.getTable())
    .where( 'id = ?', [ id ])

    return new Promise( (res, rej) => {

      return this.db.query( query.toString(), (error, result) => {

        if ( error )
          rej( error )
        else if ( result.length > 0 )
          res( result[0] )
        else
          rej( {code: BaseModel.NOT_FOUND} )

      })

    })

  } //fetchById

  delete( id ) {

    let query = this.qb
    .delete()
    .from(this.getTable())
    .where( 'id = ?', [ id ])

    return new Promise( (res, rej) => {

      return this.db.query( query.toString(), (error, result) => {

        if ( error )
          rej(error)
        else if(result.affectedRows > 0)
          res(  )
        else
          rej( {code: BaseModel.NOT_FOUND} )


      })

    })

  } // delete

  update( id, data ) {

    if(!data)
      data = this.data

    const {error} = this.validate(data)

    console.log('sjh', error)

    if(error) {
      return Promise.reject( {
        code: BaseModel.VALIDATION_ERROR,
        errors: error.details
      })
    }

    let query = this.qb
    .update()
    .table(this.getTable())
    .setFields( data )
    .where( 'id = ?', [ id ])

    return new Promise( (res, rej) => {
      return this.db.query( query.toString(), (error, result) => {

        if ( error )
          rej()
        else if(result.affectedRows > 0)
          res(  )
        else
          rej( {code: BaseModel.NOT_FOUND} )

      })

    })

  } // delete
}
