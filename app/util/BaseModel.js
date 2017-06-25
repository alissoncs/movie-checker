

export default class BaseModel {

  static get NOT_FOUND() {
    return 404;
  }

  getTable() {
    return 'assign_table'
  }

  constructor( data , modules = {}) {

    if(modules.queryBuilder)
      this.qb = modules.queryBuilder
    else
      this.qb = require('squel')

    this.db = modules.db ? modules.db : require('../database')

    this.data = data

  }

  // method to save a  register
  save( data ) {

    if(!data)
      data = this.data

    let query = this.qb
    .insert()
    .into(this.getTable())
    .setFields( data )

    return new Promise( (res, rej) => {

      return this.db.query( query.toString(), (error, result, fields) => {

        if( error )
          rej()
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
          rej( BaseModel.NOT_FOUND )

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
          rej( BaseModel.NOT_FOUND )


      })

    })

  } // delete

  update( id, data ) {

    if(data.id)
      data.id = id

    let query = this.qb
    .update()
    .table(this.getTable())
    .setFields( data )
    .where( 'id = ?', [ id ])

    return new Promise( (res, rej) => {
      return this.db.query( query.toString(), (error, result) => {
        
        if ( error )
          rej(error)
        else if(result.affectedRows > 0)
          res(  )
        else
          rej( BaseModel.NOT_FOUND )

      })

    })

  } // delete
}
