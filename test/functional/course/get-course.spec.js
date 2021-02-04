'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Course')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get a course by id', async ({ assert, client }) => {
  const courses = await Factory.model('App/Models/Course').createMany(3)

  const course = courses[0]

  const response = await client.get(`/api/courses/${course.id}`).end()

  response.assertStatus(200)

  response.assertJSONSubset({ title: course.title, id: course.id })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/courses/999').end()

  response.assertStatus(404)
})
