'use strict'

const Bond = use('App/Models/Bond')

//Todo >> Validate Inputs

class BondController {
    
  async all({ response, request }) {
    const bonds = await Bond.all()
    return response.ok(bonds)
  }
  
  async show({ response, params }) {
    const bond = await Bond.findOrFail(params.id)
    return response.ok(bond)
  }

  async store({ response, request }) {
    const bond = await Bond.create({
      ...request.only(['name']),
    })
    return response.created(bond)
  }

  async update({ response, request, params }) {

    const bond = await Bond.findOrFail(params.id)

    bond.merge(request.only(['name']));
    
    await bond.save();
    
    return response.ok(bond)
  }

  async destroy({ response, params }) {

    const bond = await Bond.findOrFail(params.id)

    await bond.delete()

    return response.noContent();
    
  }

}

module.exports = BondController
