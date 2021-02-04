'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Bonds')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the bonds', async ({ assert, client }) => {
  const bonds = await Factory.model('App/Models/Bond').createMany(3)

  const response = await client.get('/api/bonds').end()

  response.assertStatus(200)

  response.assertJSONSubset([
    { title: bonds[0].title },
    { title: bonds[1].title },
    { title: bonds[2].title }
  ])
})
