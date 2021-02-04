'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Courses')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the courses', async ({ assert, client }) => {
  const courses = await Factory.model('App/Models/Course').createMany(3)

  const response = await client.get('/api/courses').end()

  response.assertStatus(200)

  response.assertJSONSubset([
    { title: courses[0].title },
    { title: courses[1].title },
    { title: courses[2].title }
  ])
})
