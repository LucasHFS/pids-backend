'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Update Course')

trait('Test/ApiClient')
trait('Auth/Client')

test('update an course', async ({ client }) => {
  const course = await Factory.model('App/Models/Course').create()


  const data = {
    name: 'This is my new name'
  }

  const response = await client
    .put(`/api/courses/${course.id}`)
    .send(data)
    .end()

  response.assertStatus(200)

  response.assertJSONSubset({
    id: course.id,
    name: data.name,
  })
})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/api/courses/999').end()

  response.assertStatus(404)
})


test('cannot update a course if no name', async ({ assert, client }) => {
  const course = await Factory.model('App/Models/Course').make()

  const data = {
  }

  const response = await client
    .put(`/api/courses/${course.id}`)
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
