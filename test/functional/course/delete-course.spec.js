'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete Course')

trait('Test/ApiClient')
trait('Auth/Client')

test('can delete a course', async ({ client }) => {
  const course = await Factory.model('App/Models/Course').create()

  const response = await client
    .delete(`/api/courses/${course.id}`)
    .end()

  response.assertStatus(204)
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.delete('/api/courses/999').end()

  response.assertStatus(404)
})
