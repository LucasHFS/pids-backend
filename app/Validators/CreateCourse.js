'use strict'

class CreateCourses {
  get rules() {
    return {
      name: 'required|string'
    }
  }

  get messages() {
    return {
      required: 'O atributo Nome é obrigatório.',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = CreateCourses
