'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Update Role')

trait('Test/ApiClient')
trait('Auth/Client')

test('update an role\\', async ({ client }) => {
  const role = await Factory.model('App/Models/Role').create()


  const data = {
    name: 'This is my new name',
    description: role.description,
  }

  const response = await client
    .put(`/api/roles/${role.id}`)
    .send(data)
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    id: role.id,
    name: data.name,
  })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/roles/999').end()

  response.assertStatus(404)
})


test('cannot update a role if no name', async ({ assert, client }) => {
  const role = await Factory.model('App/Models/Role').make()

  const data = {
  }

  const response = await client
    .put(`/api/roles/${role.id}`)
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
