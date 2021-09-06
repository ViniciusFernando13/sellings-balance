import Sales from 'App/Actions/Sales';

export default class SalesController {
  private salesAction = new Sales();

  public async create({ request, response, auth }) {
    try {
      response.send(await this.salesAction.create(request, auth.user));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }
}
