'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bond extends Model {
    roles() {
        return this.hasMany('App/Models/User')
      }
}

module.exports = Bond
