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
      table.string('phone', 15).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.integer('bond_id').unsigned().notNullable().references('id').inTable('bonds')
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles')
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
