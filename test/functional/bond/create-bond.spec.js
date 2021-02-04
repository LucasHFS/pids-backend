'use strict'

const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('Create Challenge')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a bond if valid data', async ({ assert, client }) => {

  const { name } = await Factory.model(
    'App/Models/Bond'
  ).make()


  const data = {
    name
  }

  const response = await client
    .post('/api/bonds')
    .send(data)
    .end()

  response.assertStatus(201)

  response.assertJSONSubset({
    name: data.name,
  })
})

test('cannot create a bond if no name', async ({ assert, client }) => {
  const {  } = await Factory.model('App/Models/Bond').make()

  const data = {
  }

  const response = await client
    .post('/api/bonds')
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
