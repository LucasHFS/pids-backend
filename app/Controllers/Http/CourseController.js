'use strict'

const Course = use('App/Models/Course')

//Todo >> Validate Inputs

class CourseController {
    
  async all({ response, request }) {
    const courses = await Course.all()
    return response.ok(courses)
  }
  
  async show({ response, params }) {
    const course = await Course.findOrFail(params.id)
    return response.ok(course)
  }

  async store({ response, request }) {
    const course = await Course.create({
      ...request.only(['name']),
    })
    return response.created(course)
  }

  async update({ response, request, params }) {

    const course = await Course.findOrFail(params.id)

    course.merge(request.only(['name']));
    
    await course.save();
    
    return response.ok(course)
  }

  async destroy({ response, params }) {

    const course = await Course.findOrFail(params.id)

    await course.delete()

    return response.noContent();
    
  }

}

module.exports = CourseController
