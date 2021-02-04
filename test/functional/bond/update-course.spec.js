'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Update Bond')

trait('Test/ApiClient')
trait('Auth/Client')

test('update an bond', async ({ client }) => {
  const bond = await Factory.model('App/Models/Bond').create()


  const data = {
    name: 'This is my new name'
  }

  const response = await client
    .put(`/api/bonds/${bond.id}`)
    .send(data)
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    id: bond.id,
    name: data.name,
  })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/bonds/999').end()

  response.assertStatus(404)
})


test('cannot update a bond if no name', async ({ assert, client }) => {
  const bond = await Factory.model('App/Models/Bond').make()

  const data = {
  }

  const response = await client
    .put(`/api/bonds/${bond.id}`)
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
