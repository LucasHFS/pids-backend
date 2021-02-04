'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Bond')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get a bond by id', async ({ assert, client }) => {
  const bonds = await Factory.model('App/Models/Bond').createMany(3)

  const bond = bonds[0]

  const response = await client.get(`/api/bonds/${bond.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ title: bond.title, id: bond.id })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/bonds/999').end()

  response.assertStatus(404)
})
