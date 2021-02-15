'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Users')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the users', async ({ assert, client }) => {
  const users = await Factory.model('App/Models/User').createMany(3);

  const courses = await Factory.model('App/Models/Course').createMany(3)

  const courses_ids = courses.map(function(c) {return c.id;});

  users.map(async user => {
    await user.courses().attach(courses_ids);
  });

  const response = await client.get('/api/users').end()

  console.log(response.error)

  response.assertStatus(200)

  response.assertJSONSubset([
    { cpf: users[0].cpf },
    { cpf: users[1].cpf },
    { cpf: users[2].cpf }
  ])
})
