'use strict'

class CreateCourses {
  get rules() {
    return {
      name: 'required|string', 
      email: 'required|email|unique:users', 
      cpf: 'required|min:11|max:11|string|unique:users', 
      bond_id: 'required|number', 
      role_id: 'number', 
      course_id: 'required', 
      password: 'required|min:6|max:30', 
    }
  }

  get messages() {
    return {
      'name.required': 'O Atributo Nome é Obrigatório.',
      'phone.required': 'O Atributo Telefone é Obrigatório.',
      'bond_id.required': 'O Atributo Vínculo é Obrigatório.',
      'course_id.required': 'O Atributo Curso é Obrigatório.',
      'password.required': 'O Atributo Senha é Obrigatório.',
      'password.min': 'Senha deve possuir 6 ou mais caracteres.',
      'cpf.min': 'CPF deve possuir 11 números.',
      'cpf.max': 'CPF deve possuir 11 números.',
      string: '{{ field }} não é um texto válido.',
      unique: 'Já existe um cadastro com esse {{ field }}.'
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
