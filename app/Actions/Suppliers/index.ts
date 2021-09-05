import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class Suppliers {
  /**
   * Realiza o cadastro de um fornecedor para um usuário
   * @param request
   * @param User
   * @return Supplier
   */
  public async create(request, user: User) {
    try {
      // schema para validação do request
      const createSchema = schema.create({
        name: schema.string({ trim: true }, [rules.minLength(3)]),
        commission: schema.number(),
      });

      // valida os campos
      const payload = await request.validate({ schema: createSchema });

      // insere o fornecedor
      return await user.related('suppliers').create(payload);
    } catch (error) {
      console.log(error);

      if (error.messages) {
        throw new Error('The data given invalid');
      }

      throw new Error('Try later');
    }
  }

  /**
   * Atualiza um fornecedor
   * @param request
   * @param id
   * @param User
   * @return Supplier
   */
  public async update(request, id: number, user: User) {
    try {
      const supplier = await user.related('suppliers').query().where('id', id).first();
      if (!supplier) {
        throw new Error('Supplier does not exist');
      }

      // schema para validação do request
      const updateSchema = schema.create({
        name: schema.string.optional({ trim: true }, [rules.minLength(3)]),
        commission: schema.number.optional(),
      });

      // valida os campos
      const payload = await request.validate({ schema: updateSchema });

      // atualiza o fornecedor
      return await supplier.merge(payload).save();
    } catch (error) {
      if (error.messages) {
        console.log(error.messages);

        throw error.messages.errors;
      }

      throw error;
    }
  }

  /**
   * Inativa um fornecedor
   * @param id
   * @param User
   * @return Supplier
   */
  public async delete(id: number, user: User) {
    try {
      const supplier = await user.related('suppliers').query().where('id', id).first();
      if (!supplier) {
        throw new Error('Supplier does not exist');
      }

      // inativa o fornecedor
      return await supplier.merge({ active: false }).save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Ativa um fornecedor
   * @param id
   * @param User
   * @return Supplier
   */
  public async active(id: number, user: User) {
    try {
      const supplier = await user.related('suppliers').query().where('id', id).first();
      if (!supplier) {
        throw new Error('Supplier does not exist');
      }

      // inativa o fornecedor
      return await supplier.merge({ active: true }).save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os fornecedores do usuário
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
   * Retorna os fornecedores ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAll(user: User) {
    try {
      return await user.related('activeSuppliers').query();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os fornecedores ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAllWithInactive(user: User) {
    try {
      return await user.related('suppliers').query();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os fornecedores ativos do usuário
   * @param User
   * @return Supplier
   */
  public async findAllInactive(user: User) {
    try {
      return await user.related('inactiveSuppliers').query();
    } catch (error) {
      throw error;
    }
  }
}
