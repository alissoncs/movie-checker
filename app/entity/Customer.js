import BaseModel from '../util/BaseModel'

export default class Customer extends BaseModel {

  getTable() {
    return 'customers'
  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      name: data.name,
      address: data.address
    } )

  }

  update( id, data) {

    return super.update( id, {
      name: data.name,
      address: data.address
    })

  }

}
