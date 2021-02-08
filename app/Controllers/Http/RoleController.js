'use strict'

const Role = use('App/Models/Role')

//Todo >> Validate Inputs

class RoleController {
    
  async all({ response, request }) {
    const roles = await Role.all()
    return response.ok(roles)
  }
  
  async show({ response, params }) {
    const role = await Role.findOrFail(params.id)
    return response.ok(role)
  }

  async store({ response, request }) {
    const role = await Role.create({
      ...request.only(['name', 'description']),
    })
    return response.created(role)
  }

  async update({ response, request, params }) {

    const role = await Role.findOrFail(params.id)

    role.merge(request.only(['name', 'description']));
    
    await role.save();
    
    return response.ok(role)
  }

  async destroy({ response, params }) {

    const role = await Role.findOrFail(params.id)

    await role.delete()

    return response.noContent();
    
  }

}

module.exports = RoleController
