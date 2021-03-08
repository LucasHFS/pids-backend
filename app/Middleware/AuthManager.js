'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthManager {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    // call next to advance the request
    try {
      await auth.check();
      if (auth.user.role_id !== 1 || auth.user.role_id !== 2) {
        throw new Error('Need manager privileges');
      }
    } catch (error) {
      return response.status(401).send({ message: error.message });
    }
    await next();
  }
}

module.exports = AuthManager;
