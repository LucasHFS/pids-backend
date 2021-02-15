'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('cpf', 11).notNullable().unique()
      table.integer('bond_id').unsigned().references('id').inTable('bonds').onDelete('cascade').index('bond_id')
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('cascade').index('role_id')
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
