import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class Sales {
  /**
   * Realiza o cadastro de um fornecedor para um usuário
   * @param request
   * @param User
   * @return Sale
   */
  public async create(request, user: User) {
    try {
      // schema para validação do request
      const createSchema = schema.create({
        clientName: schema.string({ trim: true }, [rules.minLength(3)]),
        date: schema.date(),
        saleItems: schema.array().members(
          schema.object().members({
            productId: schema.number(),
            quantity: schema.number(),
          })
        ),
      });

      // valida os campos
      const payload = await request.validate({ schema: createSchema });
      console.log(payload);

      // insere o venda
      const sale = await user.related('sales').create(payload);

      // insere os itens da venda
      const saleItens = await sale.related('saleItems').createMany(payload.saleItems);

      return { ...sale.serialize(), saleItens };
    } catch (error) {
      console.log(error);

      if (error.messages) {
        throw new Error('The data given invalid');
      }

      throw new Error('Try later');
    }
  }
}
