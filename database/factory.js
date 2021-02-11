'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    name: faker.username(),
    email: faker.email(),
    cpf: faker.cpf(),
    bond_id: 1,
    password: 'password123',
  }
})

Factory.blueprint('App/Models/Course', faker => {
  return {
    name: faker.name(),
  }
})

Factory.blueprint('App/Models/Bond', faker => {
  return {
    name: faker.name(),
  }
})

Factory.blueprint('App/Models/Role', faker => {
  return {
    name: faker.name(),
    description: faker.name(),
  }
})