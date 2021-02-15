'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create_User')

trait('Test/ApiClient')
trait('Auth/Client')

test('can update a User if valid data', async ({ assert, client }) => {

  const user = await Factory.model(
    'App/Models/User'
  ).create();

  const courses = await Factory.model('App/Models/Course').createMany(3)
  const courses_ids = courses.map(function(c) {return c.id;});

  await user.courses().attach(courses_ids);


  const data = {
    name: 'lucas',
    email: 'lucas@gmail.com',
    courses: courses_ids
  }

  const response = await client
    .put(`/api/users/${user.id}`)
    .send(data)
    .end()

  console.log(response.error)
  // console.log('data',response)

  response.assertStatus(200)

  response.assertJSONSubset({
    id: user.id,
    name: data.name,
    email: data.email,
  })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/users/999').end()

  response.assertStatus(404)
})