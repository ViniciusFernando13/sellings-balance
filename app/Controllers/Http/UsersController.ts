import Auth from 'App/Actions/Auth';

export default class UsersController {
  private authAction = new Auth();

  public async signUp({ request, response }) {
    try {
      response.send(await this.authAction.signUp(request));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async signIn({ request, response, auth }) {
    try {
      response.send(await this.authAction.signIn(request, auth));
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }
}
