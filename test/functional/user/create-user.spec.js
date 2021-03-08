'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create_User')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a User if valid data', async ({ assert, client }) => {

  const { name, email, cpf, phone, password, role_id,  bond_id } = await Factory.model(
    'App/Models/User'
  ).make();


  const courses = await Factory.model('App/Models/Course').createMany(3)

  const courses_ids = courses.map(function(c) {return c.id;});


  const data = {
    name,
    email,
    phone,
    cpf,
    password,
    bond_id,
    role_id,
    course_id: courses_ids
  }

  const response = await client
    .post('/api/users')
    .send(data)
    .end()

  console.log(response.error)
  // console.log('data',response)

  response.assertStatus(201)

  response.assertJSONSubset({
    name: data.name,
    email: data.email,
    cpf: data.cpf,
    phone: data.phone,
    bond_id: data.bond_id,
    role_id: data.role_id,
    courses: [],
  })
})

