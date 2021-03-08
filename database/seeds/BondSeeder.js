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
const Bond = use('App/Models/Bond')


class BondSeeder {
  async run () {
    await Bond.createMany([
      { name: "Visitante" },
      { name: "Discente" },
      { name: "Docente" },
      { name: "Colaborador" }
    ])
  }
}

module.exports = BondSeeder
