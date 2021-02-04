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
    username: faker.username(),
    email: faker.email(),
    cpf: faker.cpf(),
    vinculo_id: faker.number(),
    curso_id: faker.number(),
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

Factory.blueprint('App/Models/Movie', (faker, index, data) => {
  return {
    title: faker.sentence(),
    ...data
  }
})
