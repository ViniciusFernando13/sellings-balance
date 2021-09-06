import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class Products {
  /**
   * Realiza o cadastro de um produto para um usuário
   * @param request
   * @param User
   * @return Product
   */
  public async create(request, user: User) {
    try {
      // schema para validação do request
      const createSchema = schema.create({
        supplierId: schema.number([rules.exists({ table: 'suppliers', column: 'id', where: { user_id: user.id } })]),
        name: schema.string({ trim: true }, [rules.minLength(3)]),
        price: schema.number(),
        inventory: schema.number(),
      });

      // valida os campos
      const payload = await request.validate({ schema: createSchema });

      // insere o produto
      return await user.related('products').create(payload);
    } catch (error) {
      console.log(error);

      if (error.messages) {
        throw new Error('The data given invalid');
      }

      throw new Error('Try later');
    }
  }

  /**
   * Atualiza um produto
   * @param request
   * @param id
   * @param User
   * @return Product
   */
  public async update(request, id: number, user: User) {
    try {
      const product = await user.related('products').query().where('id', id).first();
      if (!product) {
        throw new Error('Product does not exist');
      }

      // schema para validação do request
      const updateSchema = schema.create({
        supplierId: schema.number.optional([
          rules.exists({ table: 'suppliers', column: 'id', where: { user_id: user.id } }),
        ]),
        name: schema.string.optional({ trim: true }, [rules.minLength(3)]),
        price: schema.number.optional(),
        inventory: schema.number.optional(),
      });

      // valida os campos
      const payload = await request.validate({ schema: updateSchema });

      // atualiza o produto
      return await product.merge(payload).save();
    } catch (error) {
      if (error.messages) {
        console.log(error.messages);

        throw error.messages.errors;
      }

      throw error;
    }
  }

  /**
   * Inativa um produto
   * @param id
   * @param User
   * @return Product
   */
  public async delete(id: number, user: User) {
    try {
      const product = await user.related('products').query().where('id', id).first();
      if (!product) {
        throw new Error('Supplier does not exist');
      }

      // inativa o produto
      return await product.merge({ active: false }).save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Ativa um produto
   * @param id
   * @param User
   * @return Supplier
   */
  public async active(id: number, user: User) {
    try {
      const product = await user.related('products').query().where('id', id).first();
      if (!product) {
        throw new Error('Product does not exist');
      }

      // inativa o produto
      return await product.merge({ active: true }).save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os produtos do usuário
   * @param id
   * @param User
   * @return Supplier
   */
  public async find(id: number, user: User) {
    try {
      const supplier = await user.related('suppliers').query().where('id', id).first();
      if (!supplier) {
        throw new Error('Supplier does not exist');
      }
      return supplier;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os produtos ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAll(user: User) {
    try {
      return await user.related('activeProducts').query();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os produtos ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAllWithInactive(user: User) {
    try {
      return await user.related('products').query();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os produtos ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAllInactive(user: User) {
    try {
      return await user.related('inactiveProducts').query();
    } catch (error) {
      throw error;
    }
  }
}
