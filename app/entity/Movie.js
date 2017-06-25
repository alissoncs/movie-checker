import BaseModel from '../util/BaseModel'

export default class Movie extends BaseModel {

  // method to save a movie register
  save( data ) {

    if(!data)
      data = this.data

    let query = this.qb
    .insert()
    .into('movies')
    .setFields({
      title: data.name,
      amount: data.amount ? data.amount : 1
    })

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
    .from('movies')

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
    .from('movies')
    .where( 'id = ?', [ id ])

    return new Promise( (res, rej) => {

      return this.db.query( query.toString(), (error, result) => {

        if ( error )
          rej( error )
        else if ( result.length > 0 )
          res( result[0] )
        else
          rej( Movie.NOT_FOUND )

      })

    })

  }

}
