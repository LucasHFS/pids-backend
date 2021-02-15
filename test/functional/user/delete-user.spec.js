'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete User')

trait('Test/ApiClient')
trait('Auth/Client')

test('can delete a user', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete(`/api/users/${user.id}`)
    .end()

  response.assertStatus(204)
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.delete('/api/users/999').end()

  response.assertStatus(404)
})
