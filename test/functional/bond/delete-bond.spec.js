'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete Bond')

trait('Test/ApiClient')
trait('Auth/Client')

test('can delete a bond', async ({ client }) => {
  const bond = await Factory.model('App/Models/Bond').create()

  const response = await client
    .delete(`/api/bonds/${bond.id}`)
    .end()

  response.assertStatus(204)
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.delete('/api/bonds/999').end()

  response.assertStatus(404)
})
