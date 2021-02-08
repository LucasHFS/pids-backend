'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete Role')

trait('Test/ApiClient')
trait('Auth/Client')

test('can delete a role', async ({ client }) => {
  const role = await Factory.model('App/Models/Role').create()

  const response = await client
    .delete(`/api/roles/${role.id}`)
    .end()

  response.assertStatus(204)
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.delete('/api/roles/999').end()

  response.assertStatus(404)
})
