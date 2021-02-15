'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get User by Id')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the users', async ({ assert, client }) => {
  const users = await Factory.model('App/Models/User').createMany(3);

  const courses = await Factory.model('App/Models/Course').createMany(3)

  const courses_ids = courses.map(function(c) {return c.id;});

  users.map(async user => {
    await user.courses().attach(courses_ids);
  });

  const response = await client.get(`/api/users/${users[0].id}`).end()

  console.log(response.error)

  response.assertStatus(200)

  response.assertJSONSubset({ cpf: users[0].cpf })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/users/999').end()

  response.assertStatus(404)
})
