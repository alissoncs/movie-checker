

export default class BaseModel {

  static get NOT_FOUND() {
    return 404;
  }

  constructor( data , modules = {}) {

    if(modules.queryBuilder)
      this.qb = modules.queryBuilder
    else
      this.qb = require('squel')

    this.db = modules.db ? modules.db : require('../database')

    this.data = data

  }

  runSql( sql, attributes ) {



  }

}
