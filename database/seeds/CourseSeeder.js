'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Course = use('App/Models/Course')


class CourseSeeder {
  async run () {
    await Course.createMany([
      { name: "Sem Vínculo de Curso com a UEG" },
      { name: "Arquitetura e Urbanismo"},
      { name: "Ciências Biológicas"},
      { name: "Engenharia Agrícoila"},
      { name: "Engenharia Civil"},
      { name: "Farmácia"},
      { name: "Física"},
      { name: "Matemática"},
      { name: "Química"},
      { name: "Sistemas de Informação"},
    ])
  }
}

module.exports = CourseSeeder
