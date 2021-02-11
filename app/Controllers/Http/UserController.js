'use strict'

const User = use('App/Models/User')

//Todo >> Validate Inputs

class UserController {
    
  async all({ response, request }) {
    const users = await User.all()
    return response.ok(users)
  }
  
  async show({ response, params }) {
    const user = await User.findOrFail(params.id)
    return response.ok(user)
  }

  async store({ response, request }) {
    const user = await User.create({
      ...request.only(['name', 'email', 'cpf', 'bond_id', 'password']),
    })
    return response.created(user)
  }

  async update({ response, request, params }) {

    const user = await User.findOrFail(params.id)

    user.merge(request.only(['name', 'email', 'cpf', 'bond_id', 'password']));
    
    await user.save();
    
    return response.ok(user)
  }

  async destroy({ response, params }) {

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.noContent();
    
  }

}

module.exports = UserController
