  
'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//luke

Route.group(()=>{
  Route.get('/', 'CourseController.all')
  Route.get('/:id', 'CourseController.show')
  Route.post('/', 'CourseController.store').validator('CreateCourse')
  Route.put('/:id', 'CourseController.update').validator('CreateCourse')
  Route.delete('/:id', 'CourseController.destroy')
}).prefix('/api/courses');

Route.group(()=>{
  Route.get('/', 'BondController.all')
  Route.get('/:id', 'BondController.show')
  Route.post('/', 'BondController.store').validator('CreateBond')
  Route.put('/:id', 'BondController.update').validator('CreateBond')
  Route.delete('/:id', 'BondController.destroy')
}).prefix('/api/bonds');