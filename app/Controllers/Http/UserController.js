'use strict'

const User = use('App/Models/User')

//Todo >> Validate Inputs

class UserController {
    
  async all({ response, request }) {
    const users = await User
      .query()
      .with('roles')
      .with('courses')
      .with('bonds')
      .fetch();

    return response.ok(users)
  }
  
  async show({ response, params }) {
    const user = await User.findOrFail(params.id);
    await user.loadMany(['roles', 'courses', 'bonds']);
    return response.ok(user)
  }

  async store({ response, request }) {
    const { roles, courses, ...data} = request.only(['name', 'email', 'cpf', 'bond_id', 'role_id', 'password', 'courses']);

    const user = await User.create(data);

    await user.courses().attach(courses);

    await user.loadMany(['roles', 'courses', 'bonds'])

    return response.created(user)
  }

  async update({ response, request, params }) {
    

    const user = await User.findOrFail(params.id)

    const { roles, courses, ...data} = request.only(['name', 'email', 'cpf', 'bond_id', 'role_id', 'password', 'courses']);
    
    await user.merge(data);

    await user.courses().sync(courses);
    
    await user.save();

    await user.loadMany(['roles', 'courses', 'bonds'])
    
    return response.ok(user)
  }

  async destroy({ response, params }) {

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.noContent();
    
  }

}

module.exports = UserController
