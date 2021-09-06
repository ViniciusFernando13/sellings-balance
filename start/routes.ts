/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('sign_up', 'UsersController.signUp');
  Route.post('sign_in', 'UsersController.signIn');
}).prefix('auth');

Route.group(() => {
  Route.post('', 'SuppliersController.create');
  Route.put(':id', 'SuppliersController.update');
  Route.delete(':id', 'SuppliersController.delete');
  Route.put(':id/active', 'SuppliersController.active');
  Route.get('', 'SuppliersController.findAll');
  Route.get('all', 'SuppliersController.findAllWithInactive');
  Route.get('inactive', 'SuppliersController.findAllInactive');
  Route.get(':id', 'SuppliersController.find');
})
  .prefix('suppliers')
  .middleware('auth');

Route.group(() => {
  Route.post('', 'ProductsController.create');
  Route.put(':id', 'ProductsController.update');
  Route.delete(':id', 'ProductsController.delete');
  Route.put(':id/active', 'ProductsController.active');
  Route.get('', 'ProductsController.findAll');
  Route.get('all', 'ProductsController.findAllWithInactive');
  Route.get('inactive', 'ProductsController.findAllInactive');
  Route.get(':id', 'ProductsController.find');
})
  .prefix('products')
  .middleware('auth');

Route.group(() => {
  Route.post('', 'SalesController.create');
})
  .prefix('sales')
  .middleware('auth');
