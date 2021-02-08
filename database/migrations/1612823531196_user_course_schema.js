'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCoursesSchema extends Schema {
  up () {
    this.create('user_course', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_course')
  }
}

module.exports = UserCoursesSchema
