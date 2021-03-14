'use strict'

const Course = use('App/Models/Course')

//Todo >> Validate Inputs

class CourseController {
    
  async all({ response, request }) {
    const courses = await Course.all()
    return response.ok(courses)
  }
  
  async show({ response, params }) {
    const course = await Course.find(params.id)

    if(!course){
      return response.notFound({message: 'Curso não encontrado!'})
    }
    return response.ok(course)
  }

  async store({ response, request }) {
    const course = await Course.create({
      ...request.only(['name']),
    })
    return response.created(course)
  }

  async update({ response, request, params }) {

    const course = await Course.find(params.id)

    if(!course){
      return response.notFound({message: 'Curso não encontrado!'})
    }

    course.merge(request.only(['name']));
    
    await course.save();
    
    return response.ok(course)
  }

  async destroy({ response, params }) {

    const course = await Course.find(params.id)

    if(!course){
      return response.notFound({message: 'Curso não encontrado!'})
    }

    let relatedUsers = await course.users().fetch();

    relatedUsers = relatedUsers.toJSON();

    if(!relatedUsers || relatedUsers.length < 1){
      await course.delete()
      return response.noContent();
    }else{
      const relUsers = relatedUsers.map(user=> {
        return {id: user.id, name:user.name}
      });
      return response.badRequest({error: 'Não é possível excluir esse Papel, pois há usuários cadastrados com ele.', users: relUsers})
    }
  }
}

module.exports = CourseController
