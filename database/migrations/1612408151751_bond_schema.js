'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BondSchema extends Schema {
  up () {
    this.create('bonds', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bonds')
  }
}

module.exports = BondSchema
