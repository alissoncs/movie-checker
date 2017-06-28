const expect = require('expect')

import Customer from '../../app/entity/Customer'

describe('Customer', () => {

  it('getTable method', () => {

    let customer = new Customer( {}, {db:null} )
    let table = customer.getTable()
    expect(table).toBe('customers')

  })

  it('save validation method',() => {

    let customer = new Customer( {}, {db:null} )
    let result = customer.save()
    .then(() => {
      expect(1).toBe(1, 'This promise must to be rejected')
    })
    .catch((err) => {
      expect(err.code).toBe(400)
      expect(err.errors.length).toBe(1)
      expect(err.errors[0].message).toBe('"name" is required')
    })

    expect(result).toBeA(Promise)

  })

})
