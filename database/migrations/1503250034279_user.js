'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('cpf', 11).notNullable().unique()
      table.integer('bond_id').unsigned().references('id').inTable('bonds')
      table.integer('user_courses_id').unsigned().references('id').inTable('user_courses')
      table.integer('user_roles_id').unsigned().references('id').inTable('user_roles')
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
