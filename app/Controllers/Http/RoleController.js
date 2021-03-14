'use strict'

const Role = use('App/Models/Role')

//Todo >> Validate Inputs

class RoleController {
    
  async all({ response, request }) {
    const roles = await Role.all()
    return response.ok(roles)
  }
  
  async show({ response, params }) {
    const role = await Role.find(params.id)
    if(!role){
      return response.notFound({message: 'Papel não encontrado!'})
    }
    return response.ok(role)
  }

  async store({ response, request }) {
    const role = await Role.create({
      ...request.only(['name', 'description']),
    })
    return response.created(role)
  }

  async update({ response, request, params }) {

    const role = await Role.find(params.id)

    if(!role){
      return response.notFound({message: 'Papel não encontrado!'})
    }

    role.merge(request.only(['name', 'description']));
    
    await role.save();
    
    return response.ok(role)
  }

  async destroy({ response, params }) {

    const role = await Role.find(params.id);

    if(!role){
      return response.notFound({error: 'Papel não encontrado!'})
    }

    let relatedUsers = await role.users().fetch();

    relatedUsers = relatedUsers.toJSON();

    if(!relatedUsers || relatedUsers.length < 1){
      await role.delete()
      return response.noContent();
    }else{
      const relUsers = relatedUsers.map(user=> {
        return {id: user.id, name:user.name}
      });
      return response.badRequest({error: 'Não é possível excluir esse Papel, pois há usuários cadastrados com ele.', users: relUsers})
    }
    
  }

}

module.exports = RoleController
