import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class Auth {
  /**
   * Realiza o cadastro de um usuário
   * @param request
   * @return User
   */
  public async signUp(request) {
    try {
      // schema para validação do request
      const signUpSchema = schema.create({
        name: schema.string({ trim: true }, [rules.minLength(3)]),
        email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string({ escape: true }, [rules.minLength(8), rules.confirmed()]),
      });

      // valida os campos
      const payload = await request.validate({ schema: signUpSchema });

      // insere o usuario
      return await User.create(payload);
    } catch (error) {
      if (error.messages) {
        throw new Error('The data given invalid');
      } else if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('E-mail already registered');
      }
      throw new Error('Try later');
    }
  }

  /**
   * Realiza o login do usuário
   * @param request
   * @param auth
   * @return string Token
   */
  public async signIn(request, auth) {
    try {
      // schema para validação do request
      const signInSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({ escape: true }, [rules.minLength(8)]),
      });

      // valida os campos
      const payload = await request.validate({ schema: signInSchema });

      // gera o token
      return await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '30mins',
      });
    } catch (error) {
      throw new Error('The data given invalid');
    }
  }
}
