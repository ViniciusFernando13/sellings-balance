import Products from 'App/Actions/Products';

export default class ProductsController {
  private productsAction = new Products();

  public async create({ request, response, auth }) {
    try {
      response.send(await this.productsAction.create(request, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async update({ request, response, auth, params }) {
    try {
      response.send(await this.productsAction.update(request, params.id, auth.user));
    } catch (error) {
      response.badRequest(Array.isArray(error) ? { messages: error } : { message: error.message });
    }
  }

  public async delete({ response, auth, params }) {
    try {
      response.send(await this.productsAction.delete(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async active({ response, auth, params }) {
    try {
      response.send(await this.productsAction.active(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async find({ response, auth, params }) {
    try {
      response.send(await this.productsAction.find(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAll({ response, auth }) {
    try {
      response.send({ suppliers: await this.productsAction.findAll(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAllWithInactive({ response, auth }) {
    try {
      response.send({ suppliersAll: await this.productsAction.findAllWithInactive(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAllInactive({ response, auth }) {
    try {
      response.send({ inactiveSuppliers: await this.productsAction.findAllInactive(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }
}
