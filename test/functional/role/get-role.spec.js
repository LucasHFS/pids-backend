'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Role')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get a role by id', async ({ assert, client }) => {
  const roles = await Factory.model('App/Models/Role').createMany(3)

  const role = roles[0]

  const response = await client.get(`/api/roles/${role.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ title: role.title, id: role.id })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/roles/999').end()

  response.assertStatus(404)
})
