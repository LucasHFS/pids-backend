'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create_User')

trait('Test/ApiClient')
trait('Auth/Client')

test('can create a User if valid data', async ({ assert, client }) => {

  
  const bond = await Factory.model('App/Models/Bond').make()
  
  // Many to Many Relationship Test

  // const UserCourse = use('App/Models/UserCourse')
  // const UserRole = use('App/Models/UserRole')
  // const course = await Factory.model('App/Models/Course').make()
  // const user = await Factory.model('App/Models/User').make()
  // const role = await Factory.model('App/Models/Role').make()

  // const user_course = await UserCourse.create({
  //   user_id: user.id,
  //   course_id: course.id
  // })

  // const user_role = await UserRole.create({
  //   user_id: user.id,
  //   role_id: role.id
  // })
  

  const { name, email, cpf, password, bond_id } = await Factory.model(
    'App/Models/User'
  ).make()

  console.log("name",name)

  const data = {
    name,
    email,
    cpf,
    password,
    bond_id: bond_id,
  }

  const response = await client
    .post('/api/users')
    .send(data)
    .end()

  console.log(response.error)

  response.assertStatus(201)

  response.assertJSONSubset({
    name: data.name,
    email: data.email,
    cpf: data.cpf,
    password: data.password, //encrypted
    bond_id: data.bond_id,

  })
})

