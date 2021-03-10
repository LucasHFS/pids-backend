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
      .where('active', true)
      .fetch();

    return response.ok(users)
  }
  
  async show({ response, params }) {
    const user = await User.findOrFail(params.id);
    await user.loadMany(['roles', 'courses', 'bonds']);
    return response.ok(user);
  }

  async store({ response, request }) {
    const { role_id, course_id, ...data} = request.only(['name', 'email', 'cpf', 'phone', 'bond_id', 'role_id', 'password', 'course_id']);

    const user = await User.create({...data, role_id: role_id || 1});

    await user.courses().attach(course_id);

    await user.loadMany(['roles', 'courses', 'bonds'])

    return response.created(user)
  }

  async update({ response, request, params }) {
    

    const user = await User.findOrFail(params.id)

    const { roles, course_id, ...data} = request.only(['name', 'email', 'cpf', 'phone', 'bond_id', 'role_id', 'password', 'course_id']);
    
    await user.merge(data);

    if(course_id){
      await user.courses().sync(courses);
    }
    
    await user.save();

    await user.loadMany(['roles', 'courses', 'bonds'])
    
    return response.ok(user)
  }

  async destroy({ response, params }) {

    const user = await User.find(params.id);

    if(!user){
      return response.status(400).json({message: 'Usuário não encontrado!'})
    }

    await user.merge({active: false})

    await user.save();

    return response.noContent();
    
  }

}

module.exports = UserController
