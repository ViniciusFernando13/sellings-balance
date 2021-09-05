import Suppliers from 'App/Actions/Suppliers';

export default class SuppliersController {
  private suppliersAction = new Suppliers();

  public async create({ request, response, auth }) {
    try {
      response.send(await this.suppliersAction.create(request, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async update({ request, response, auth, params }) {
    try {
      response.send(await this.suppliersAction.update(request, params.id, auth.user));
    } catch (error) {
      response.badRequest(Array.isArray(error) ? { messages: error } : { message: error.message });
    }
  }

  public async delete({ response, auth, params }) {
    try {
      response.send(await this.suppliersAction.delete(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async active({ response, auth, params }) {
    try {
      response.send(await this.suppliersAction.active(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async find({ response, auth, params }) {
    try {
      response.send(await this.suppliersAction.find(params.id, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAll({ response, auth }) {
    try {
      response.send({ suppliers: await this.suppliersAction.findAll(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAllWithInactive({ response, auth }) {
    try {
      response.send({ suppliersAll: await this.suppliersAction.findAllWithInactive(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async findAllInactive({ response, auth }) {
    try {
      response.send({ inactiveSuppliers: await this.suppliersAction.findAllInactive(auth.user) });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }
}
