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
const Role = use('App/Models/Role')


class RoleSeeder {
  async run () {
    await Role.createMany([
      {
        name: "Usuário Comum",
        description: "Solicita as Reservas",
      },
      {
        name: "Gestor",
        description: "Gerencia o Cadastro de Locais e Equipamentos, aprova ou nega as Reservas",
      },
      {
        name: "Administrador",
        description: "Possui todas as permissões de acessos",
      },
    ])
  }
}

module.exports = RoleSeeder
