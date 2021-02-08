'use strict'

const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('Create Role')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a role if valid data', async ({ assert, client }) => {

  const { name, description } = await Factory.model(
    'App/Models/Role'
  ).make()


  const data = {
    name,
    description
  }

  const response = await client
    .post('/api/roles')
    .send(data)
    .end()

  response.assertStatus(201)

  response.assertJSONSubset({
    name: data.name,
    description: data.description
  })
})

test('cannot create a role if no name', async ({ assert, client }) => {
  const {  } = await Factory.model('App/Models/Role').make()

  const data = {
  }

  const response = await client
    .post('/api/roles')
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
