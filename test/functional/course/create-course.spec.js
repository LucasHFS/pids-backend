'use strict'

const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('Create Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a course if valid data', async ({ assert, client }) => {

  const { name } = await Factory.model(
    'App/Models/Course'
  ).make()


  const data = {
    name
  }

  const response = await client
    .post('/api/courses')
    .send(data)
    .end()

  response.assertStatus(201)

  response.assertJSONSubset({
    name: data.name,
  })
})

test('cannot create a course if no name', async ({ assert, client }) => {
  const {  } = await Factory.model('App/Models/Course').make()

  const data = {
  }

  const response = await client
    .post('/api/courses')
    .send(data)
    .end()

  response.assertStatus(400)

  response.assertJSONSubset([
    {
      message: 'name is required',
      field: 'name',
      validation: 'required'
    }
  ])
})
