'use strict'

const Bond = use('App/Models/Bond')

//Todo >> Validate Inputs

class BondController {
    
  async all({ response, request }) {
    const bonds = await Bond.all()
    return response.ok(bonds)
  }
  
  async show({ response, params }) {
    const bond = await Bond.find(params.id)

    if(!bond){
      return response.notFound({message: 'Vínculo não encontrado!'})
    }
    return response.ok(bond)
  }

  async store({ response, request }) {
    const bond = await Bond.create({
      ...request.only(['name']),
    })
    return response.created(bond)
  }

  async update({ response, request, params }) {

    const bond = await Bond.find(params.id)

    if(!bond){
      return response.notFound({message: 'Vínculo não encontrado!'})
    }

    bond.merge(request.only(['name']));
    
    await bond.save();
    
    return response.ok(bond)
  }

  async destroy({ response, params }) {

    const bond = await Bond.find(params.id)

    if(!bond){
      return response.notFound({message: 'Vínculo não encontrado!'})
    }

    let relatedUsers = await bond.users().fetch();

    relatedUsers = relatedUsers.toJSON();

    if(!relatedUsers || relatedUsers.length < 1){
      await bond.delete()
      return response.noContent();
    }else{
      const relUsers = relatedUsers.map(user=> {
        return {id: user.id, name:user.name}
      });
      return response.badRequest({error: 'Não é possível excluir esse Papel, pois há usuários cadastrados com ele.', users: relUsers})
    }
    
  }

}

module.exports = BondController
