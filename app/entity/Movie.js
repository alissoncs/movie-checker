import BaseModel from '../util/BaseModel'

export default class Movie extends BaseModel {

  getTable() {
    return 'movies'
  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      title: data.name,
      amount: data.amount
    } )

  }

  update( id, data) {

    return super.update( id, {
      title: data.name,
      amount: data.amount
    })

  }

}
